import { ColorScheme } from './color-scheme';

fdescribe('ColorScheme', () => {
  describe('static fromJson(json: string): ColorScheme', () => {
    it('should fetch a name', () => {
      const json = '{ "name": "name_test" }';

      const colorScheme = ColorScheme.fromJson(json);

      expect(colorScheme.name).toBe('name_test');
    });

    it('should fetch an editor background', () => {
      const json = '{ "colors": { "editor.background": "#f0f0f0" } }';

      const colorScheme = ColorScheme.fromJson(json);

      expect(colorScheme.backgroundColor.toHexString()).toBe('#f0f0f0');
    });

    it('should set default editor background if "colors" is not defined', () => {
      const json = '{}';

      const colorScheme = ColorScheme.fromJson(json);

      expect(colorScheme.backgroundColor.toHexString()).toBe('#000000');
    });

    it('should set default editor background if "editor.background" is not defined', () => {
      const json = '{ "colors": {}}';

      const colorScheme = ColorScheme.fromJson(json);

      expect(colorScheme.backgroundColor.toHexString()).toBe('#000000');
    });

    describe('"tokenColors" fetching', () => {
      describe('should not fetch a tokenColor', () => {
        it('if it does not contains "settings"', () => {
          const json = `{
            "tokenColors": [
              {
                "name": "name_test",
                "scope": "scope_test"
              }
            ]}`;

          const colorScheme = ColorScheme.fromJson(json);

          expect(colorScheme.tokenColors.length).toBe(0);
        });

        it('if "settings" does not contains "foreground"', () => {
          const json = `{
            "tokenColors": [
              {
                "name": "name_test",
                "scope": "scope_test",
                "settings": { }
              }
            ]}`;

          const colorScheme = ColorScheme.fromJson(json);

          expect(colorScheme.tokenColors.length).toBe(0);
        });

        it('if "scope" is undefined', () => {
          const json = `{
            "tokenColors": [
              {
                "name": "name_test",
                "settings": {
                  "fontStyle": "italic",
                  "foreground": "#110000"
                }
              }
            ]}`;

          const colorScheme = ColorScheme.fromJson(json);

          expect(colorScheme.tokenColors.length).toBe(0);
        });

        it('if "scope" is empty string', () => {
          const json = `{
            "tokenColors": [
              {
                "name": "name_test",
                "scope": "",
                "settings": {
                  "fontStyle": "italic",
                  "foreground": "#110000"
                }
              }
            ]}`;

          const colorScheme = ColorScheme.fromJson(json);

          expect(colorScheme.tokenColors.length).toBe(0);
        });

        it('if "scope" is empty array', () => {
          const json = `{
            "tokenColors": [
              {
                "name": "name_test",
                "scope": [],
                "settings": {
                  "fontStyle": "italic",
                  "foreground": "#110000"
                }
              }
            ]}`;

          const colorScheme = ColorScheme.fromJson(json);

          expect(colorScheme.tokenColors.length).toBe(0);
        });
      });

      it('should fetch "name"', () => {
        const json = `{
          "tokenColors": [
            {
              "name": "name_test",
              "scope": "scope_test",
              "settings": {
                "fontStyle": "italic",
                "foreground": "#110000"
              }
            }
          ]}`;

        const colorScheme = ColorScheme.fromJson(json);

        expect(colorScheme.tokenColors[0].name).toBe('name_test');
      });

      it('should fetch "scope"', () => {
        const json = `{
          "tokenColors": [
            {
              "scope": "scope_test",
              "settings": {
                "foreground": "#110000"
              }
            }
          ]}`;

        const colorScheme = ColorScheme.fromJson(json);

        expect(colorScheme.tokenColors[0].scope).toBe('scope_test');
      });

      it('should fetch "scope" as a proper string if it is array', () => {
        const json = `{
          "tokenColors": [
            {
              "scope": ["scope_test1", "scope_test2"],
              "settings": {
                "foreground": "#110000"
              }
            }
          ]}`;

        const colorScheme = ColorScheme.fromJson(json);

        expect(colorScheme.tokenColors[0].scope).toBe(
          'scope_test1, scope_test2'
        );
      });

      it('should return empty tokenColors if they are not defined', () => {
        const json = '{}';

        const colorScheme = ColorScheme.fromJson(json);

        expect(colorScheme.tokenColors.length).toBe(0);
      });

      it('should fetch "color"', () => {
        const json = `{
          "tokenColors": [
            {
              "name": "name_test",
              "scope": "scope_test",
              "settings": {
                "fontStyle": "italic",
                "foreground": "#110000"
              }
            }
          ]}`;

        const colorScheme = ColorScheme.fromJson(json);

        expect(colorScheme.tokenColors[0].color.toHexString()).toBe('#110000');
      });

      it('should properly calculate "readability"', () => {
        const json = `{
          "colors": { "editor.background": "#ffffff" },
          "tokenColors": [
            {
              "name": "name_test",
              "scope": "scope_test",
              "settings": {
                "fontStyle": "italic",
                "foreground": "#000000"
              }
            }
          ]}`;

        const colorScheme = ColorScheme.fromJson(json);

        expect(colorScheme.tokenColors[0].readability).toBe(21);
      });
    });
  });
});
