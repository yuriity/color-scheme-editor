import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';
import { TinycolorInstance } from './tinycolor-instance';

export class TokenColorResource {
  readonly id: number;
  readonly name: string;
  readonly scope: string;
  readonly color: TinycolorInstance;
  readonly fontStyleBold: boolean;
  readonly fontStyleItalic: boolean;
  readonly fontStyleUnderline: boolean;
  readonly readability: number;
  readonly modified: boolean;

  constructor(
    private readonly _tokenColor: TokenColor,
    public readonly background: TinycolorInstance
  ) {
    if (!_tokenColor) {
      throw Error('"_tokenColor" should be initialized.');
    }
    if (!background) {
      throw Error('"_background" should be initialized.');
    }

    this.id = this._tokenColor.id;

    this.name = this._tokenColor.name
      ? this._tokenColor.name
      : this._tokenColor.originalName;

    this.scope = this._tokenColor.scope
      ? this._tokenColor.scope
      : this._tokenColor.originalScope;

    this.color = this._tokenColor.color
      ? this._tokenColor.color
      : this._tokenColor.originalColor;

    this.fontStyleBold = this._tokenColor.fontStyle
      ? this._tokenColor.fontStyle.includes('bold')
      : this._tokenColor.originalFontStyle
      ? this._tokenColor.originalFontStyle.includes('bold')
      : false;

    this.fontStyleItalic = this._tokenColor.fontStyle
      ? this._tokenColor.fontStyle.includes('italic')
      : this._tokenColor.originalFontStyle
      ? this._tokenColor.originalFontStyle.includes('italic')
      : false;

    this.fontStyleUnderline = this._tokenColor.fontStyle
      ? this._tokenColor.fontStyle.includes('underline')
      : this._tokenColor.originalFontStyle
      ? this._tokenColor.originalFontStyle.includes('underline')
      : false;

    this.modified = !!(
      this._tokenColor.name ||
      this._tokenColor.scope ||
      this._tokenColor.color ||
      this._tokenColor.fontStyle
    );

    this.readability = tinycolor.readability(this.background, this.color);
  }
}
