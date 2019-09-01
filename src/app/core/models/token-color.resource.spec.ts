import * as tinycolor from 'tinycolor2';

import { TokenColorResource } from './token-color.resource';

describe('TokenColorResource', () => {
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

  describe('readonly name: string', () => {
    it('should return "name" if it modified', () => {
      const tokenColor = { name: 'test_name' } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.name).toBe('test_name');
    });

    it('should return "originalName" if it is not modified', () => {
      const tokenColor = { originalName: 'test_name' } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.name).toBe('test_name');
    });
  });

  describe('readonly scope: string', () => {
    it('should return "scope" if it modified', () => {
      const tokenColor = { scope: 'test_scope' } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.scope).toBe('test_scope');
    });

    it('should return "originalScope" if it is not modified', () => {
      const tokenColor = { originalScope: 'test_scope' } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.scope).toBe('test_scope');
    });
  });

  describe('readonly color: TinycolorInstance', () => {
    it('should return "color" if it modified', () => {
      const color = tinycolor('#00ff00');
      const tokenColor = { color } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.color.toHexString()).toBe('#00ff00');
    });

    it('should return "originalColor" if it is not modified', () => {
      const color = tinycolor('#00ff00');
      const tokenColor = { originalColor: color } as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.color.toHexString()).toBe('#00ff00');
    });
  });

  describe('readonly fontStyleBold: boolean', () => {
    describe('should return true', () => {
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

    it('should return false if fontStyle does not contains "bold" string', () => {
      const tokenColor = {} as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.fontStyleBold).toBeFalsy();
    });
  });

  describe('readonly fontStyleItalic: boolean', () => {
    describe('should return true', () => {
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

    it('should return false if fontStyle does not contains "italic" string', () => {
      const tokenColor = {} as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.fontStyleItalic).toBeFalsy();
    });
  });

  describe('readonly fontStyleUnderline: boolean', () => {
    describe('should return true', () => {
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

    it('should return false if fontStyle does not contains "underline" string', () => {
      const tokenColor = {} as any;
      const actual = new TokenColorResource(tokenColor, tinycolor());

      expect(actual.fontStyleUnderline).toBeFalsy();
    });
  });

  it('should properly calculate "readability"', () => {
    const color = tinycolor('#ffffff');
    const tokenColor = { color } as any;
    const actual = new TokenColorResource(tokenColor, tinycolor());

    expect(actual.readability).toBe(21);
  });

  describe('readonly modified: boolean', () => {
    describe('should return true', () => {
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

    it('should return false if tokenColor is not modified', () => {
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
});
