import type { ExportMetadata } from './MetadataGenerator';

export type ExportResolution = 1 | 2 | 4;

interface ExportOptions {
  resolution: ExportResolution;
  metadata?: ExportMetadata;
  filename: string;
}

/**
 * Export a canvas element to PNG
 */
export async function exportCanvasToPNG(
  canvasOrContainer: HTMLCanvasElement | HTMLElement,
  options: ExportOptions
): Promise<void> {
  // Find the canvas element
  let canvas: HTMLCanvasElement;

  if (canvasOrContainer instanceof HTMLCanvasElement) {
    canvas = canvasOrContainer;
  } else {
    const found = canvasOrContainer.querySelector('canvas');
    if (!found) {
      throw new Error('No canvas element found in container');
    }
    canvas = found;
  }

  const { resolution, filename } = options;

  // Create a temporary canvas for scaling
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    throw new Error('Could not create canvas context');
  }

  // Set scaled dimensions
  const scaledWidth = canvas.width * resolution;
  const scaledHeight = canvas.height * resolution;

  tempCanvas.width = scaledWidth;
  tempCanvas.height = scaledHeight;

  // Draw scaled image
  tempCtx.imageSmoothingEnabled = true;
  tempCtx.imageSmoothingQuality = 'high';
  tempCtx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);

  // Convert to blob
  return new Promise((resolve, reject) => {
    tempCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        URL.revokeObjectURL(url);
        resolve();
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Export WebGL canvas (Three.js) to PNG
 * WebGL canvases need preserveDrawingBuffer or readPixels
 */
export async function exportWebGLToPNG(
  container: HTMLElement,
  options: ExportOptions
): Promise<void> {
  const canvas = container.querySelector('canvas');

  if (!canvas) {
    throw new Error('No canvas element found');
  }

  // For WebGL, we need to force a render and capture immediately
  // Since preserveDrawingBuffer might not be set, we capture what's visible
  const { resolution, filename } = options;

  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    throw new Error('Could not create canvas context');
  }

  const scaledWidth = canvas.width * resolution;
  const scaledHeight = canvas.height * resolution;

  tempCanvas.width = scaledWidth;
  tempCanvas.height = scaledHeight;

  // Draw the canvas content
  tempCtx.imageSmoothingEnabled = true;
  tempCtx.imageSmoothingQuality = 'high';
  tempCtx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);

  return new Promise((resolve, reject) => {
    tempCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
        resolve();
      },
      'image/png',
      1.0
    );
  });
}
