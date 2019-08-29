import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';
import { TinycolorInstance } from './tinycolor-instance';

export class TokenColorResource {
  readonly name: string;
  readonly scope: string;
  readonly color: TinycolorInstance;
  readonly fontStyleBold: boolean;
  readonly fontStyleItalic: boolean;
  readonly fontStyleUnderline: boolean;
  readonly readability: number;
  readonly modified: boolean;

  constructor(
    public readonly tokenColor: TokenColor,
    public readonly background: TinycolorInstance
  ) {
    if (!tokenColor) {
      throw Error('"_tokenColor" should be initialized.');
    }
    if (!background) {
      throw Error('"_background" should be initialized.');
    }

    this.name = this.tokenColor.name
      ? this.tokenColor.name
      : this.tokenColor.originalName;

    this.scope = this.tokenColor.scope
      ? this.tokenColor.scope
      : this.tokenColor.originalScope;

    this.color = this.tokenColor.color
      ? this.tokenColor.color
      : this.tokenColor.originalColor;

    this.fontStyleBold = this.tokenColor.fontStyle
      ? this.tokenColor.fontStyle.includes('bold')
      : this.tokenColor.originalFontStyle
      ? this.tokenColor.originalFontStyle.includes('bold')
      : false;

    this.fontStyleItalic = this.tokenColor.fontStyle
      ? this.tokenColor.fontStyle.includes('italic')
      : this.tokenColor.originalFontStyle
      ? this.tokenColor.originalFontStyle.includes('italic')
      : false;

    this.fontStyleUnderline = this.tokenColor.fontStyle
      ? this.tokenColor.fontStyle.includes('underline')
      : this.tokenColor.originalFontStyle
      ? this.tokenColor.originalFontStyle.includes('underline')
      : false;

    this.modified = !!(
      this.tokenColor.name ||
      this.tokenColor.scope ||
      this.tokenColor.color ||
      this.tokenColor.fontStyle
    );

    this.readability = tinycolor.readability(this.background, this.color);
  }
}
