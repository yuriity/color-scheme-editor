export interface Range {
  min: number;
  max: number;
}

export interface ReadabilityLevel {
  range: Range;
  name: string;
  color: string;
  class: string;
  message: string;
}

const readabilityLevels: ReadabilityLevel[] = [
  {
    range: { min: 0, max: 3 },
    name: 'fail',
    color: '#c00',
    class: 'eye-slash',
    message: 'Fails WCAG 2.0'
  },
  {
    range: { min: 3, max: 4.5 },
    name: 'aa-large',
    color: '#e69900',
    class: 'low-vision',
    message: 'Passes AA for large text (above 18pt or bold above 14pt)'
  },
  {
    range: { min: 4.5, max: 7 },
    name: 'aa',
    color: '#8ab82e',
    class: 'eye',
    message:
      'Passes AA level for any size text and AAA for large text (above 18pt or bold above 14pt)'
  },
  {
    range: { min: 7, max: 22 },
    name: 'aaa',
    color: '#5ea72a',
    class: 'eye',
    message: 'Passes AAA level for any size text'
  }
];

export function getReadabilityLevel(readability: number): ReadabilityLevel {
  for (const level of readabilityLevels) {
    if (readability >= level.range.min && readability < level.range.max) {
      return level;
    }
  }
}
