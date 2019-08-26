import * as stripJsonComments from 'strip-json-comments';
import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';
import { TinycolorInstance } from './tinycolor-instance';

export class ColorScheme {
  constructor(
    public name: string,
    public backgroundColor: TinycolorInstance,
    public tokenColors: TokenColor[]
  ) {}

  static fromJson(json: string): ColorScheme {
    const jsonObj = JSON.parse(stripJsonComments(json));
    const background = this.fetchEditorBackground(jsonObj);
    const tokenColors = this.fetchTokenColors(jsonObj, background);

    return new ColorScheme(jsonObj.name, background, tokenColors);
  }

  private static fetchEditorBackground(jsonObj: any): TinycolorInstance {
    if (!jsonObj.colors || !jsonObj.colors['editor.background']) {
      console.warn(`Could not fetch 'editor.background'.`);
      return tinycolor();
    }
    return tinycolor(jsonObj.colors['editor.background']);
  }

  private static fetchTokenColors(
    jsonObj: any,
    background: TinycolorInstance
  ): TokenColor[] {
    const tokenColors = [];

    if (jsonObj.tokenColors) {
      for (const jsonTokenColor of jsonObj.tokenColors) {
        if (
          jsonTokenColor.scope &&
          jsonTokenColor.scope.length &&
          jsonTokenColor.settings &&
          jsonTokenColor.settings.foreground
        ) {
          const color = tinycolor(jsonTokenColor.settings.foreground);
          const scope = this.fetchScope(jsonTokenColor.scope);
          tokenColors.push(
            new TokenColor(
              jsonTokenColor.name,
              scope,
              color,
              tinycolor.readability(background, color)
            )
          );
        }
      }
    } else {
      console.warn('Could not fetch any tokenColors.');
    }

    return tokenColors;
  }

  private static fetchScope(scope: any): string {
    if (scope instanceof Array) {
      return scope.toString().replace(/,/g, ', ');
    }

    return scope;
  }
}
