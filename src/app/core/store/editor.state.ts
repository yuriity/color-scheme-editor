import { ColorScheme } from '../models/color-scheme';

export interface EditorState {
  loading: boolean;
  colorScheme?: ColorScheme;
  error?: string;
}
