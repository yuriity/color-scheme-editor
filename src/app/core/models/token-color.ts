import { TinycolorInstance } from './tinycolor-instance';

export interface TokenColor {
  id: number;
  name: string;
  scope: string;
  color: TinycolorInstance;
  readability: number;
}
