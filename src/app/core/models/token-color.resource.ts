import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';
import { TinycolorInstance } from './tinycolor-instance';

export class TokenColorResource {
  readonly id: number;
  name: string;
  scope: string;
  fontStyleBold: boolean;
  fontStyleItalic: boolean;
  fontStyleUnderline: boolean;
  modified: boolean;

  private _color: TinycolorInstance;
  get color(): TinycolorInstance {
    return this._color;
  }
  set color(value: TinycolorInstance) {
    this._color = value;

    this._readability = tinycolor.readability(this.background, this._color);
  }

  private _readability: number;
  get readability(): number {
    return this._readability;
  }

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

    this.id = this.tokenColor.id;
    this.name = this.getActualName();
    this.scope = this.getActualScope();
    this.color = this.getActualColor();
    this.fontStyleBold = this.getActualFontStyleBold();
    this.fontStyleItalic = this.getActualFontStyleItalic();
    this.fontStyleUnderline = this.getActualFontStyleUnderline();

    this.modified = !!(
      this.tokenColor.name ||
      this.tokenColor.scope ||
      this.tokenColor.color ||
      this.tokenColor.fontStyle
    );
  }

  reset() {
    this.name = this.getActualName();
    this.scope = this.getActualScope();
    this.color = this.getActualColor();
    this.fontStyleBold = this.getActualFontStyleBold();
    this.fontStyleItalic = this.getActualFontStyleItalic();
    this.fontStyleUnderline = this.getActualFontStyleUnderline();
  }

  getFontStyles(): string {
    if (
      !this.fontStyleBold &&
      !this.fontStyleItalic &&
      !this.fontStyleUnderline
    ) {
      return null;
    }

    let fontStyles = '';
    if (this.fontStyleBold) {
      fontStyles = fontStyles.concat('bold');
    }
    if (this.fontStyleItalic) {
      fontStyles = fontStyles.concat(' italic');
    }
    if (this.fontStyleUnderline) {
      fontStyles = fontStyles.concat(' underline');
    }

    return fontStyles.trim();
  }

  private getActualName(): string {
    return this.tokenColor.name
      ? this.tokenColor.name
      : this.tokenColor.originalName;
  }

  private getActualScope(): string {
    return this.tokenColor.scope
      ? this.tokenColor.scope
      : this.tokenColor.originalScope;
  }

  private getActualColor(): TinycolorInstance {
    return this.tokenColor.color
      ? this.tokenColor.color
      : this.tokenColor.originalColor;
  }

  private getActualFontStyleBold(): boolean {
    return this.tokenColor.fontStyle
      ? this.tokenColor.fontStyle.includes('bold')
      : this.tokenColor.originalFontStyle
      ? this.tokenColor.originalFontStyle.includes('bold')
      : false;
  }

  private getActualFontStyleItalic(): boolean {
    return this.tokenColor.fontStyle
      ? this.tokenColor.fontStyle.includes('italic')
      : this.tokenColor.originalFontStyle
      ? this.tokenColor.originalFontStyle.includes('italic')
      : false;
  }

  private getActualFontStyleUnderline(): boolean {
    return this.tokenColor.fontStyle
      ? this.tokenColor.fontStyle.includes('underline')
      : this.tokenColor.originalFontStyle
      ? this.tokenColor.originalFontStyle.includes('underline')
      : false;
  }
}
