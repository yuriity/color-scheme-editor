import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import * as stripJsonComments from 'strip-json-comments';

import {
  parseColorSchemeMetadata,
  parseTokenColor
} from '../utils/color-scheme-parser';
import { ColorScheme } from '../models/color-scheme';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor() {}

  loadColorScheme(file: File): Observable<ColorScheme> {
    const reader = new FileReader();
    const fileReader$ = fromEvent<any>(reader, 'load').pipe(
      map(event => this.fromJsonString(event.target.result))
    );

    reader.readAsText(file);

    return fileReader$;
  }

  private fromJsonString(json: string): ColorScheme {
    const jsonObj = JSON.parse(stripJsonComments(json));
    const metadata = parseColorSchemeMetadata(jsonObj);
    const tokenColors = [];

    if (jsonObj.tokenColors) {
      for (const jsonTokenColor of jsonObj.tokenColors) {
        const tokenColor = parseTokenColor(jsonTokenColor, metadata.background);
        if (tokenColor) {
          tokenColors.push(tokenColor);
        }
      }
    } else {
      console.warn('Could not fetch any tokenColors.');
    }

    return { metadata, tokenColors };
  }
}
