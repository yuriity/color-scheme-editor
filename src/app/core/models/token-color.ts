import { TinycolorInstance } from './tinycolor-instance';

export type TokenColor = Readonly<{
  id: number;
  originalName: string;
  name: string | null;
  originalScope: string;
  scope: string | null;
  originalColor: TinycolorInstance;
  color: TinycolorInstance | null;
  originalFontStyle: string;
  fontStyle: string | null;
}>;
