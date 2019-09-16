import { TokenColorResource } from './token-color.resource';

export class ColorSchemeResource {
  constructor(public name: string, public tokens: TokenColorResource[]) {}
}
