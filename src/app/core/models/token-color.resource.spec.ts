import * as tinycolor from 'tinycolor2';

import { TokenColorResource } from './token-color.resource';

describe('TokenColorResource', () => {
  describe('constructor', () => {
    it('should throw error if "_tokenColor" is undefined', () => {
      expect(() => {
        const res = new TokenColorResource(undefined, tinycolor());
      }).toThrowError('"_tokenColor" should be initialized.');
    });

    it('should throw error if "_tokenColor" is null', () => {
      expect(() => {
        const res = new TokenColorResource(null, tinycolor());
      }).toThrowError('"_tokenColor" should be initialized.');
    });

    it('should throw error if "_background" is undefined', () => {
      expect(() => {
        const tokenColor = {} as any;
        const res = new TokenColorResource(tokenColor, undefined);
      }).toThrowError('"_background" should be initialized.');
    });

    it('should throw error if "_background" is null', () => {
      expect(() => {
        const tokenColor = {} as any;
        const res = new TokenColorResource(tokenColor, null);
      }).toThrowError('"_background" should be initialized.');
    });

    it('should initialize "id"', () => {
      const tokenColor = { id: 42 } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.id).toBe(42);
    });

    describe('"name" initialization', () => {
      it('should take "_tokenColor.name" if it modified', () => {
        const tokenColor = { name: 'test_name' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.name).toBe('test_name');
      });

      it('should take "_tokenColor.originalName" if it is not modified', () => {
        const tokenColor = { originalName: 'test_name' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.name).toBe('test_name');
      });
    });

    describe('"scope" initialization', () => {
      it('should take "_tokenColor.scope" if it modified', () => {
        const tokenColor = { scope: 'test_scope' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.scope).toBe('test_scope');
      });

      it('should take "_tokenColor.originalScope" if it is not modified', () => {
        const tokenColor = { originalScope: 'test_scope' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.scope).toBe('test_scope');
      });
    });

    describe('"color" initialization', () => {
      it('should take "_tokenColor.color" if it modified', () => {
        const color = tinycolor('#00ff00');
        const tokenColor = { color } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.color.toHexString()).toBe('#00ff00');
      });

      it('should take "_tokenColor.originalColor" if it is not modified', () => {
        const color = tinycolor('#00ff00');
        const tokenColor = { originalColor: color } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.color.toHexString()).toBe('#00ff00');
      });
    });

    describe('"fontStyleBold" initialization', () => {
      describe('should initialize with true', () => {
        it('if "fontStyle" contains "bold" string', () => {
          const tokenColor = { fontStyle: 'bold' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          expect(actual.fontStyleBold).toBeTruthy();
        });

        it('if "originalFontStyle" contains "bold" string', () => {
          const tokenColor = { originalFontStyle: 'bold' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          expect(actual.fontStyleBold).toBeTruthy();
        });
      });

      it('should initialize with false if fontStyle does not contains "bold" string', () => {
        const tokenColor = {} as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.fontStyleBold).toBeFalsy();
      });
    });

    describe('"fontStyleItalic" initialization', () => {
      describe('should initialize with true', () => {
        it('if "fontStyle" contains "italic" string', () => {
          const tokenColor = { fontStyle: 'italic' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          expect(actual.fontStyleItalic).toBeTruthy();
        });

        it('if "originalFontStyle" contains "italic" string', () => {
          const tokenColor = { originalFontStyle: 'italic' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          expect(actual.fontStyleItalic).toBeTruthy();
        });
      });

      it('should initialize with false if fontStyle does not contains "italic" string', () => {
        const tokenColor = {} as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.fontStyleItalic).toBeFalsy();
      });
    });

    describe('"fontStyleUnderline" initialization', () => {
      describe('should initialize with true', () => {
        it('if "fontStyle" contains "underline" string', () => {
          const tokenColor = { fontStyle: 'underline' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          expect(actual.fontStyleUnderline).toBeTruthy();
        });

        it('if "originalFontStyle" contains "underline" string', () => {
          const tokenColor = { originalFontStyle: 'underline' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          expect(actual.fontStyleUnderline).toBeTruthy();
        });
      });

      it('should initialize with false if fontStyle does not contains "underline" string', () => {
        const tokenColor = {} as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        expect(actual.fontStyleUnderline).toBeFalsy();
      });
    });

    it('should properly initialize "readability"', () => {
      const color = tinycolor('#ffffff');
      const tokenColor = { color } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.readability).toBe(21);
    });

    describe('should initialize with true', () => {
      it('if name is modified', () => {
        const actual = new TokenColorResource(
          { name: 'test' } as any,
          tinycolor()
        );
        expect(actual.modified).toBeTruthy();
      });

      it('if scope is modified', () => {
        const actual = new TokenColorResource(
          { scope: 'test' } as any,
          tinycolor()
        );
        expect(actual.modified).toBeTruthy();
      });

      it('if color is modified', () => {
        const color = tinycolor('#ffffff');
        const actual = new TokenColorResource({ color } as any, tinycolor());
        expect(actual.modified).toBeTruthy();
      });

      it('if fontStyle is modified', () => {
        const actual = new TokenColorResource(
          { fontStyle: 'bold' } as any,
          tinycolor()
        );
        expect(actual.modified).toBeTruthy();
      });
    });

    it('should initialize with false if tokenColor is not modified', () => {
      const color = tinycolor('#ffffff');
      const actual = new TokenColorResource(
        {
          originalName: 'test_name',
          originalScope: 'test_scope',
          originalColor: color,
          originalFontStyle: 'bold'
        } as any,
        tinycolor()
      );
      expect(actual.modified).toBeFalsy();
    });
  });

  describe('set color(value: TinycolorInstance)', () => {
    it('should set "color" with new value', () => {
      const color = tinycolor('#00ff00');
      const tokenColor = { color } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      actual.color = tinycolor('#0000ff');

      expect(actual.color.toHexString()).toBe('#0000ff');
    });

    it('should update "readability"', () => {
      const color = tinycolor('#ffffff');
      const tokenColor = { color } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      actual.color = tinycolor('#0000ff');

      expect(actual.readability).toBe(2.444);
    });
  });

  describe('reset()', () => {
    describe('"name" resetting', () => {
      it('should take "_tokenColor.name" if it modified', () => {
        const tokenColor = { name: 'test_name' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.name = 'modified';
        actual.reset();

        expect(actual.name).toBe('test_name');
      });

      it('should take "_tokenColor.originalName" if it is not modified', () => {
        const tokenColor = { originalName: 'test_name' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.name = 'modified';
        actual.reset();

        expect(actual.name).toBe('test_name');
      });
    });

    describe('"scope" resetting', () => {
      it('should take "_tokenColor.scope" if it modified', () => {
        const tokenColor = { scope: 'test_scope' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.scope = 'modified';
        actual.reset();

        expect(actual.scope).toBe('test_scope');
      });

      it('should take "_tokenColor.originalScope" if it is not modified', () => {
        const tokenColor = { originalScope: 'test_scope' } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.scope = 'modified';
        actual.reset();

        expect(actual.scope).toBe('test_scope');
      });
    });

    describe('"color" resetting', () => {
      it('should take "_tokenColor.color" if it modified', () => {
        const color = tinycolor('#00ff00');
        const tokenColor = { color } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.color = tinycolor('#f0000f');
        actual.reset();

        expect(actual.color.toHexString()).toBe('#00ff00');
      });

      it('should take "_tokenColor.originalColor" if it is not modified', () => {
        const color = tinycolor('#00ff00');
        const tokenColor = { originalColor: color } as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.color = tinycolor('#f0000f');
        actual.reset();

        expect(actual.color.toHexString()).toBe('#00ff00');
      });
    });

    describe('"fontStyleBold" resetting', () => {
      describe('should initialize with true', () => {
        it('if "fontStyle" contains "bold" string', () => {
          const tokenColor = { fontStyle: 'bold' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          actual.fontStyleBold = false;
          actual.reset();

          expect(actual.fontStyleBold).toBeTruthy();
        });

        it('if "originalFontStyle" contains "bold" string', () => {
          const tokenColor = { originalFontStyle: 'bold' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          actual.fontStyleBold = false;
          actual.reset();

          expect(actual.fontStyleBold).toBeTruthy();
        });
      });

      it('should initialize with false if fontStyle does not contains "bold" string', () => {
        const tokenColor = {} as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.fontStyleBold = true;
        actual.reset();

        expect(actual.fontStyleBold).toBeFalsy();
      });
    });

    describe('"fontStyleItalic" resetting', () => {
      describe('should initialize with true', () => {
        it('if "fontStyle" contains "italic" string', () => {
          const tokenColor = { fontStyle: 'italic' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          actual.fontStyleItalic = false;
          actual.reset();

          expect(actual.fontStyleItalic).toBeTruthy();
        });

        it('if "originalFontStyle" contains "italic" string', () => {
          const tokenColor = { originalFontStyle: 'italic' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          actual.fontStyleItalic = false;
          actual.reset();

          expect(actual.fontStyleItalic).toBeTruthy();
        });
      });

      it('should initialize with false if fontStyle does not contains "italic" string', () => {
        const tokenColor = {} as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.fontStyleItalic = true;
        actual.reset();

        expect(actual.fontStyleItalic).toBeFalsy();
      });
    });

    describe('"fontStyleUnderline" resetting', () => {
      describe('should initialize with true', () => {
        it('if "fontStyle" contains "underline" string', () => {
          const tokenColor = { fontStyle: 'underline' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          actual.fontStyleUnderline = false;
          actual.reset();

          expect(actual.fontStyleUnderline).toBeTruthy();
        });

        it('if "originalFontStyle" contains "underline" string', () => {
          const tokenColor = { originalFontStyle: 'underline' } as any;
          const actual = new TokenColorResource(tokenColor, tinycolor());

          actual.fontStyleUnderline = false;
          actual.reset();

          expect(actual.fontStyleUnderline).toBeTruthy();
        });
      });

      it('should initialize with false if fontStyle does not contains "underline" string', () => {
        const tokenColor = {} as any;
        const actual = new TokenColorResource(tokenColor, tinycolor());

        actual.fontStyleUnderline = true;
        actual.reset();

        expect(actual.fontStyleUnderline).toBeFalsy();
      });
    });
  });

  describe('getFontStyles(): string', () => {
    it('should return null if font styles not setted', () => {
      const tokenColor = {} as any;
      const token = new TokenColorResource(tokenColor, tinycolor());

      const actual = token.getFontStyles();

      expect(actual).toBeNull();
    });

    it('should return proper string if "fontStyleBold" is setted', () => {
      const token = new TokenColorResource({} as any, tinycolor());
      token.fontStyleBold = true;

      const actual = token.getFontStyles();

      expect(actual).toBe('bold');
    });

    it('should return proper string if "fontStyleItalic" is setted', () => {
      const token = new TokenColorResource({} as any, tinycolor());
      token.fontStyleItalic = true;

      const actual = token.getFontStyles();

      expect(actual).toBe('italic');
    });

    it('should return proper string if "fontStyleUnderline" is setted', () => {
      const token = new TokenColorResource({} as any, tinycolor());
      token.fontStyleUnderline = true;

      const actual = token.getFontStyles();

      expect(actual).toBe('underline');
    });

    it('should return proper string if all font styles setted to true', () => {
      const token = new TokenColorResource({} as any, tinycolor());
      token.fontStyleBold = true;
      token.fontStyleItalic = true;
      token.fontStyleUnderline = true;

      const actual = token.getFontStyles();

      expect(actual).toBe('bold italic underline');
    });
  });
});
