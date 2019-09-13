import * as tinycolor from 'tinycolor2';

import { ThemeColorRule } from './theme-color-rule';

describe('ThemeColorRule', () => {
  describe('constructor', () => {
    describe('"name" initialization', () => {
      it('should take "tokenColor.name" if it modified', () => {
        const tokenColor = { name: 'test_name' } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.name).toBe('test_name');
      });

      it('should take "tokenColor.originalName" if it is not modified', () => {
        const tokenColor = { originalName: 'test_name' } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.name).toBe('test_name');
      });
    });

    describe('"scope" initialization', () => {
      it('should take "tokenColor.scope" if it modified', () => {
        const tokenColor = { scope: 'test_scope' } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.scope).toBe('test_scope');
      });

      it('should take "tokenColor.originalScope" if it is not modified', () => {
        const tokenColor = { originalScope: 'test_scope' } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.scope).toBe('test_scope');
      });
    });

    describe('"fontStyle" initialization', () => {
      it('should take "tokenColor.fontStyle" if it modified', () => {
        const tokenColor = { fontStyle: 'test_bold' } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.fontStyle).toBe('test_bold');
      });

      it('should take "tokenColor.originalFontStyle" if it is not modified', () => {
        const tokenColor = { originalFontStyle: 'test_bold' } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.fontStyle).toBe('test_bold');
      });
    });

    describe('"foreground" initialization', () => {
      it('should take "tokenColor.color" if it modified', () => {
        const color = tinycolor('#00ff00');
        const tokenColor = { color } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.foreground).toBe('#00ff00');
      });

      it('should take "tokenColor.originalColor" if it is not modified', () => {
        const color = tinycolor('#00ff00');
        const tokenColor = { originalColor: color } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.foreground).toBe('#00ff00');
      });

      it('should properly take "tokenColor.color" if it tranparent', () => {
        const color = tinycolor('#00ff0042');
        const tokenColor = { color } as any;
        const actual = new ThemeColorRule(tokenColor);

        expect(actual.foreground).toBe('#00ff0042');
      });
    });
  });

  describe('toJSON()', () => {
    it('should properly return JSON', () => {
      const color = tinycolor('#00ff00');
      const tokenColor = {
        name: 'test_name',
        scope: 'test_scope',
        color,
        fontStyle: 'test_bold'
      } as any;
      const themeColorRule = new ThemeColorRule(tokenColor);

      const actual = JSON.stringify(themeColorRule);

      expect(actual).toBe(
        '{"name":"test_name","scope":"test_scope","settings":{"foreground":"#00ff00","fontStyle":"test_bold"}}'
      );
    });
  });
});
