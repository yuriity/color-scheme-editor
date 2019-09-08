import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';
import { TinycolorInstance } from './tinycolor-instance';

export interface ReadonlyTokenColorResource {
  readonly id: number;
  readonly name: string;
  readonly scope: string;
  readonly fontStyleBold: boolean;
  readonly fontStyleItalic: boolean;
  readonly fontStyleUnderline: boolean;
  readonly modified: boolean;
  readonly color: tinycolor.Instance;
  readonly background: tinycolor.Instance;
  readonly readability: number;
}

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
    this.name = this.getActualName();
    this.scope = this.getActualScope();
    this.color = this.getActualColor();
    this.fontStyleBold = this.getActualFontStyleBold();
    this.fontStyleItalic = this.getActualFontStyleItalic();
    this.fontStyleUnderline = this.getActualFontStyleUnderline();

    this.modified = !!(
      this._tokenColor.name ||
      this._tokenColor.scope ||
      this._tokenColor.color ||
      this._tokenColor.fontStyle
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
    return this._tokenColor.name
      ? this._tokenColor.name
      : this._tokenColor.originalName;
  }

  private getActualScope(): string {
    return this._tokenColor.scope
      ? this._tokenColor.scope
      : this._tokenColor.originalScope;
  }

  private getActualColor(): TinycolorInstance {
    return this._tokenColor.color
      ? this._tokenColor.color
      : this._tokenColor.originalColor;
  }

  private getActualFontStyleBold(): boolean {
    return this._tokenColor.fontStyle
      ? this._tokenColor.fontStyle.includes('bold')
      : this._tokenColor.originalFontStyle
      ? this._tokenColor.originalFontStyle.includes('bold')
      : false;
  }

  private getActualFontStyleItalic(): boolean {
    return this._tokenColor.fontStyle
      ? this._tokenColor.fontStyle.includes('italic')
      : this._tokenColor.originalFontStyle
      ? this._tokenColor.originalFontStyle.includes('italic')
      : false;
  }

  private getActualFontStyleUnderline(): boolean {
    return this._tokenColor.fontStyle
      ? this._tokenColor.fontStyle.includes('underline')
      : this._tokenColor.originalFontStyle
      ? this._tokenColor.originalFontStyle.includes('underline')
      : false;
  }
}
