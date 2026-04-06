import * as THREE from "three";

export type CoinTextures = {
  portrait: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
};

export function createPortraitTexture(img: HTMLImageElement) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create portrait texture context.");
  }

  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.clip();

  // Draw the image directly, scaling to fit the canvas, without cropping.
  context.drawImage(
    img,
    0,
    0,
    img.naturalWidth,
    img.naturalHeight,
    0,
    0,
    size,
    size,
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCoinBumpTexture(img: HTMLImageElement) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create coin texture context.");
  }

  context.fillStyle = "#808080";
  context.fillRect(0, 0, size, size);

  context.strokeStyle = "#c0c0c0";
  context.lineWidth = 10;
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = "#b0b0b0";
  context.lineWidth = 4;
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2 - 32, 0, Math.PI * 2);
  context.stroke();

  context.save();
  context.translate(size / 2, size / 2);
  context.fillStyle = "#c0c0c0";
  context.font = "bold 18px serif";
  context.textAlign = "center";
  context.textBaseline = "middle";

  const text = "LEO DRIESCH \u2022 MMXXVI \u2022";
  const radius = size / 2 - 22;
  for (let index = 0; index < text.length; index += 1) {
    const angle = (index / text.length) * Math.PI * 2 - Math.PI / 2;
    context.save();
    context.rotate(angle);
    context.translate(0, -radius);
    context.fillText(text[index] ?? "", 0, 0);
    context.restore();
  }
  context.restore();

  context.save();
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2 - 38, 0, Math.PI * 2);
  context.clip();

  const cropSize = Math.min(img.naturalWidth, img.naturalHeight);
  const sourceX = (img.naturalWidth - cropSize) / 2;
  const sourceY = (img.naturalHeight - cropSize) / 2;
  const padding = 38;

  context.drawImage(
    img,
    sourceX,
    sourceY,
    cropSize,
    cropSize,
    padding,
    padding,
    size - padding * 2,
    size - padding * 2,
  );
  context.restore();

  const imageData = context.getImageData(0, 0, size, size);
  for (let index = 0; index < imageData.data.length; index += 4) {
    let gray =
      imageData.data[index] * 0.299 +
      imageData.data[index + 1] * 0.587 +
      imageData.data[index + 2] * 0.114;
    const normalized = gray / 255;
    gray = (1 / (1 + Math.exp(-14 * (normalized - 0.5)))) * 255;

    imageData.data[index] = gray;
    imageData.data[index + 1] = gray;
    imageData.data[index + 2] = gray;
  }
  context.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.LinearSRGBColorSpace;
  return texture;
}

export function createInvertedTexture(source: THREE.CanvasTexture) {
  const sourceCanvas = source.image as HTMLCanvasElement;
  const size = sourceCanvas.width;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create inverted texture context.");
  }

  context.drawImage(sourceCanvas, 0, 0);
  const imageData = context.getImageData(0, 0, size, size);

  for (let index = 0; index < imageData.data.length; index += 4) {
    imageData.data[index] = 255 - imageData.data[index];
    imageData.data[index + 1] = 255 - imageData.data[index + 1];
    imageData.data[index + 2] = 255 - imageData.data[index + 2];
  }

  context.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.LinearSRGBColorSpace;
  return texture;
}
