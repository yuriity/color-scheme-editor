import tinycolor from 'tinycolor2';

import { VSCodeSettings } from './vscode-settings';

describe('VSCodeSettings', () => {
  it('should properly initialize "textMateRules"', () => {
    const color = tinycolor('#00ff00');
    const tokenColor = {
      name: 'test_name',
      scope: 'test_scope',
      color,
      fontStyle: 'test_bold'
    } as any;
    const tokenColors = [tokenColor];

    const actual = new VSCodeSettings(tokenColors);

    expect(actual.textMateRules[0].name).toBe('test_name');
  });

  it('should properly stringify object', () => {
    const color = tinycolor('#00ff00');
    const tokenColor = {
      name: 'test_name',
      scope: 'test_scope',
      color,
      fontStyle: 'test_bold'
    } as any;
    const vsCodeSettings = new VSCodeSettings([tokenColor]);

    const actual = JSON.stringify(vsCodeSettings);

    expect(actual).toBe(
      '{"editor.tokenColorCustomizations":{"textMateRules":[{"name":"test_name","scope":"test_scope","settings":{"foreground":"#00ff00","fontStyle":"test_bold"}}]}}'
    );
  });

  it('should properly stringify object if "colorSchemeName" is defined', () => {
    const tokenColor = {
      scope: 'test_scope'
    } as any;
    const vsCodeSettings = new VSCodeSettings([tokenColor], 'theme_name');

    const actual = JSON.stringify(vsCodeSettings);

    expect(actual).toBe(
      '{"editor.tokenColorCustomizations":{"[theme_name]":{"textMateRules":[{"scope":"test_scope","settings":{}}]}}}'
    );
  });
});
