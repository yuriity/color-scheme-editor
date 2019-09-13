import { ThemeColorRule } from './theme-color-rule';
import { TokenColor } from './token-color';

export class VSCodeSettings {
  readonly textMateRules: ThemeColorRule[];

  constructor(
    tokenColors: TokenColor[],
    public readonly colorSchemeName?: string
  ) {
    this.textMateRules = tokenColors.map(token => new ThemeColorRule(token));
  }

  toJSON() {
    if (this.colorSchemeName) {
      const themeSettings = {};
      themeSettings[`[${this.colorSchemeName}]`] = {
        textMateRules: this.textMateRules
      };

      return {
        'editor.tokenColorCustomizations': themeSettings
      };
    }
    return {
      'editor.tokenColorCustomizations': { textMateRules: this.textMateRules }
    };
  }
}
