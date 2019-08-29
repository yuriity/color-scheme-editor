import * as tinycolor from 'tinycolor2';

import { ColorSchemeMetadata } from '../models/color-scheme-metadata';
import { TinycolorInstance } from '../models/tinycolor-instance';
import { TokenColor } from '../models/token-color';

export function parseColorSchemeMetadata(jsonObj: any): ColorSchemeMetadata {
  const background = fetchEditorBackground(jsonObj);

  return { name: jsonObj.name, background };
}

export function parseTokenColor(
  id: number,
  jsonObject: any
): TokenColor | null {
  if (
    jsonObject.scope &&
    jsonObject.scope.length &&
    jsonObject.settings &&
    jsonObject.settings.foreground
  ) {
    const scope = fetchScope(jsonObject.scope);
    const color = tinycolor(jsonObject.settings.foreground);

    return {
      id,
      originalName: jsonObject.name,
      name: null,
      originalScope: scope,
      scope: null,
      originalColor: color,
      color: null,
      originalFontStyle: jsonObject.settings.fontStyle,
      fontStyle: null
    };
  }

  return null;
}

function fetchEditorBackground(jsonObj: any): TinycolorInstance {
  if (!jsonObj.colors || !jsonObj.colors['editor.background']) {
    console.warn(
      'Could not fetch "editor.background". Using a default background-color.'
    );
    return tinycolor();
  }
  return tinycolor(jsonObj.colors['editor.background']);
}

function fetchScope(scope: any): string {
  if (scope instanceof Array) {
    return scope.toString().replace(/,/g, ', ');
  }

  return scope;
}
