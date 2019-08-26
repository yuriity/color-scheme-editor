import { TinycolorInstance } from './tinycolor-instance';

export class TokenColor {
  constructor(
    public name: string,
    public scope: string,
    public color: TinycolorInstance,
    public readability: number
  ) {}
}
