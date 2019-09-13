import { TokenColor } from './token-color';

export class ThemeColorRule {
  readonly name: string;
  readonly scope: string;
  readonly foreground: string;
  readonly fontStyle: string;

  constructor(tokenColor: TokenColor) {
    this.name = tokenColor.name ? tokenColor.name : tokenColor.originalName;

    this.scope = tokenColor.scope ? tokenColor.scope : tokenColor.originalScope;

    const actualColor = tokenColor.color
      ? tokenColor.color
      : tokenColor.originalColor;
    if (actualColor) {
      if (actualColor.getAlpha() === 1) {
        this.foreground = actualColor.toHexString();
      } else {
        this.foreground = actualColor.toHex8String();
      }
    }

    this.fontStyle = tokenColor.fontStyle
      ? tokenColor.fontStyle
      : tokenColor.originalFontStyle;
  }

  toJSON() {
    return {
      name: this.name,
      scope: this.scope,
      settings: { foreground: this.foreground, fontStyle: this.fontStyle }
    };
  }
}
