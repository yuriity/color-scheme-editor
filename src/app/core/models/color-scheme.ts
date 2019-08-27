import { ColorSchemeMetadata } from './color-scheme-metadata';
import { TokenColor } from './token-color';

export interface ColorScheme {
  metadata: ColorSchemeMetadata;
  tokenColors: TokenColor[];
}
