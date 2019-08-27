import { TinycolorInstance } from './tinycolor-instance';

export interface TokenColor {
  id: string;
  name: string;
  scope: string;
  color: TinycolorInstance;
  readability: number;
}
