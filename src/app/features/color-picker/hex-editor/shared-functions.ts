import * as tinycolor from 'tinycolor2';

import { TinycolorInstance } from 'app/core/models/tinycolor-instance';

export function getImageColor(
  canvas: HTMLCanvasElement,
  x: number,
  y: number
): TinycolorInstance {
  const canvasContext = canvas.getContext('2d');

  x = Math.max(0, Math.min(x, canvas.width - 1));
  y = Math.max(0, Math.min(y, canvas.height - 1));

  const imageData = canvasContext.getImageData(x, y, 1, 1).data;

  return tinycolor({
    r: imageData[0],
    g: imageData[1],
    b: imageData[2]
  });
}
