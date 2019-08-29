import {
  parseColorSchemeMetadata,
  parseTokenColor
} from './color-scheme-parser';

describe('Color Scheme Parser', () => {
  describe('parseColorSchemeMetadata(jsonObj: any): ColorSchemeMetadata', () => {
    it('should fetch a name', () => {
      const json = JSON.parse('{ "name": "name_test" }');

      const actual = parseColorSchemeMetadata(json);

      expect(actual.name).toBe('name_test');
    });

    it('should fetch an editor background', () => {
      const json = JSON.parse(
        '{ "colors": { "editor.background": "#f0f0f0" } }'
      );

      const actual = parseColorSchemeMetadata(json);

      expect(actual.background.toHexString()).toBe('#f0f0f0');
    });

    it('should set default editor background if "colors" is not defined', () => {
      const json = JSON.parse('{}');

      const actual = parseColorSchemeMetadata(json);

      expect(actual.background.toHexString()).toBe('#000000');
    });

    it('should set default editor background if "editor.background" is not defined', () => {
      const json = JSON.parse('{ "colors": {}}');

      const actual = parseColorSchemeMetadata(json);

      expect(actual.background.toHexString()).toBe('#000000');
    });
  });

  describe('parseTokenColor(jsonObject: any, background: TinycolorInstance): TokenColor | null', () => {
    describe('should return null', () => {
      it('if "jsonObject" does not contains "settings"', () => {
        const json = JSON.parse(`{
          "name": "name_test",
          "scope": "scope_test"
        }`);

        const actual = parseTokenColor(0, json);

        expect(actual).toBeNull();
      });

      it('if "settings" does not contains "foreground"', () => {
        const json = JSON.parse(`{
          "name": "name_test",
          "scope": "scope_test",
          "settings": { }
        }`);

        const actual = parseTokenColor(0, json);

        expect(actual).toBeNull();
      });

      it('if "scope" is undefined', () => {
        const json = JSON.parse(`{
          "name": "name_test",
          "settings": {
            "fontStyle": "italic",
            "foreground": "#110000"
          }
        }`);

        const actual = parseTokenColor(0, json);

        expect(actual).toBeNull();
      });

      it('if "scope" is empty string', () => {
        const json = JSON.parse(`{
          "name": "name_test",
          "scope": "",
          "settings": {
            "fontStyle": "italic",
            "foreground": "#110000"
          }
        }`);

        const actual = parseTokenColor(0, json);

        expect(actual).toBeNull();
      });

      it('if "scope" is empty array', () => {
        const json = JSON.parse(`{
          "name": "name_test",
          "scope": [],
          "settings": {
            "fontStyle": "italic",
            "foreground": "#110000"
          }
        }`);

        const actual = parseTokenColor(0, json);

        expect(actual).toBeNull();
      });
    });

    it('should fetch "name"', () => {
      const json = JSON.parse(`{
        "name": "name_test",
        "scope": "scope_test",
        "settings": {
          "fontStyle": "italic",
          "foreground": "#110000"
        }
      }`);

      const actual = parseTokenColor(0, json);

      expect(actual.originalName).toBe('name_test');
    });

    it('should fetch "scope"', () => {
      const json = JSON.parse(`{
        "scope": "scope_test",
        "settings": {
          "foreground": "#110000"
        }
      }`);

      const actual = parseTokenColor(0, json);

      expect(actual.originalScope).toBe('scope_test');
    });

    it('should fetch "scope" as a proper string if it is array', () => {
      const json = JSON.parse(`{
        "scope": ["scope_test1", "scope_test2"],
        "settings": {
          "foreground": "#110000"
        }
      }`);

      const actual = parseTokenColor(0, json);

      expect(actual.originalScope).toBe('scope_test1, scope_test2');
    });

    it('should fetch "color"', () => {
      const json = JSON.parse(`{
        "name": "name_test",
        "scope": "scope_test",
        "settings": {
          "fontStyle": "italic",
          "foreground": "#110000"
        }
      }`);

      const actual = parseTokenColor(0, json);

      expect(actual.originalColor.toHexString()).toBe('#110000');
    });

    it('should fetch "fontStyle"', () => {
      const json = JSON.parse(`{
        "name": "name_test",
        "scope": "scope_test",
        "settings": {
          "fontStyle": "italic underline",
          "foreground": "#110000"
        }
      }`);

      const actual = parseTokenColor(0, json);

      expect(actual.originalFontStyle).toBe('italic underline');
    });
  });
});
