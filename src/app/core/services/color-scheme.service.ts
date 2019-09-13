import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import * as Json from '../utils/json';

import {
  parseColorSchemeMetadata,
  parseTokenColor
} from '../utils/color-scheme-parser';
import { ColorScheme } from '../models/color-scheme';

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  constructor() {}

  loadColorScheme(file: File): Observable<ColorScheme> {
    const reader = new FileReader();
    const fileReader$ = fromEvent<any>(reader, 'load').pipe(
      map(event => this.parseColorScheme(event.target.result))
    );

    reader.readAsText(file);

    return fileReader$;
  }

  parseColorScheme(json: string): ColorScheme {
    const errors: Json.ParseError[] = [];
    const jsonObj = Json.parse(json, errors);
    if (errors.length > 0) {
      const errorMsg =
        'Problems parsing JSON theme file: ' +
        errors.map(e => this.getParseErrorMessage(e.error)).join(', ');
      throw new Error(errorMsg);
    }
    const metadata = parseColorSchemeMetadata(jsonObj);
    const tokenColors = [];
    let index = 0;

    if (jsonObj.tokenColors) {
      for (const jsonTokenColor of jsonObj.tokenColors) {
        const tokenColor = parseTokenColor(index, jsonTokenColor);
        if (tokenColor) {
          tokenColors.push(tokenColor);
          index++;
        }
      }
    } else {
      console.warn('Could not fetch any tokenColors.');
    }

    return { metadata, tokenColors };
  }

  validateColorSchemeJson(json: string): string | null {
    const errors: Json.ParseError[] = [];
    Json.parse(json, errors);

    if (errors.length > 0) {
      const errorMsg =
        'Problems parsing JSON theme file: ' +
        errors.map(e => this.getParseErrorMessage(e.error)).join(', ');
      return errorMsg;
    }
    return null;
  }

  private getParseErrorMessage(errorCode: Json.ParseErrorCode): string {
    switch (errorCode) {
      case Json.ParseErrorCode.InvalidSymbol:
        return 'Invalid symbol';
      case Json.ParseErrorCode.InvalidNumberFormat:
        return 'Invalid number format';
      case Json.ParseErrorCode.PropertyNameExpected:
        return 'Property name expected';
      case Json.ParseErrorCode.ValueExpected:
        return 'Value expected';
      case Json.ParseErrorCode.ColonExpected:
        return 'Colon expected';
      case Json.ParseErrorCode.CommaExpected:
        return 'Comma expected';
      case Json.ParseErrorCode.CloseBraceExpected:
        return 'Closing brace expected';
      case Json.ParseErrorCode.CloseBracketExpected:
        return 'Closing bracket expected';
      case Json.ParseErrorCode.EndOfFileExpected:
        return 'End of file expected';
      default:
        return '';
    }
  }
}
