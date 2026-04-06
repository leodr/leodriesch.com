import * as THREE from "three";

export type CoinTextures = {
  portrait: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
};

function fillAnnulusSegment(
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  a0: number,
  a1: number,
) {
  context.beginPath();
  context.arc(cx, cy, rOuter, a0, a1);
  context.arc(cx, cy, rInner, a1, a0, true);
  context.closePath();
  context.fill();
}

/** Normalized layout (relative to maxR = size/2) for poker-chip face art. */
function pokerChipLayout(size: number) {
  const maxR = size / 2;
  const cx = size / 2;
  const cy = size / 2;
  return {
    cx,
    cy,
    maxR,
    /** Portrait sits in this circular inlay. */
    rInlay: maxR * 0.4,
    /** Decorative ring between inlay and text band. */
    rRingMid: maxR * 0.46,
    rText: maxR * 0.59,
    /** Middle band fill. */
    rBandInner: maxR * 0.46,
    rBandOuter: maxR * 0.72,
    /** Outer “dice stripe” segments. */
    rStripesInner: maxR * 0.72,
    rStripesOuter: maxR * 0.995,
    segments: 8,
  };
}

/** Bump map circular label. */
const BUMP_CIRCULAR_TEXT_FONT = "bold 60px serif";

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
  const layout = pokerChipLayout(size);
  const { cx, cy, maxR } = layout;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create coin texture context.");
  }

  // Neutral bump base
  context.fillStyle = "#808080";
  context.fillRect(0, 0, size, size);

  context.beginPath();
  context.arc(cx, cy, maxR, 0, Math.PI * 2);
  context.clip();

  // Outer stripes: slight height variation (darker = lower in bump)
  const seg = layout.segments;
  for (let i = 0; i < seg; i += 1) {
    const a0 = (i / seg) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / seg) * Math.PI * 2 - Math.PI / 2;
    context.fillStyle = i % 2 === 0 ? "#707070" : "#909090";
    fillAnnulusSegment(
      context,
      cx,
      cy,
      layout.rStripesInner,
      layout.rStripesOuter,
      a0,
      a1,
    );
  }

  // Middle band: slightly recessed
  context.fillStyle = "#6a6a6a";
  context.beginPath();
  context.arc(cx, cy, layout.rBandOuter, 0, Math.PI * 2);
  context.arc(cx, cy, layout.rBandInner, 0, Math.PI * 2, true);
  context.fill();

  // Molded ring: raised lip
  context.strokeStyle = "#a8a8a8";
  context.lineWidth = 5;
  context.beginPath();
  context.arc(cx, cy, layout.rRingMid, 0, Math.PI * 2);
  context.stroke();

  // Inlay dish: slightly raised center
  context.fillStyle = "#8e8e8e";
  context.beginPath();
  context.arc(cx, cy, layout.rInlay, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "#5a5a5a";
  context.lineWidth = 4;
  context.beginPath();
  context.arc(cx, cy, layout.rInlay, 0, Math.PI * 2);
  context.stroke();

  // Circular text (raised emboss)
  context.save();
  context.translate(cx, cy);
  context.fillStyle = "#b0b0b0";
  context.font = BUMP_CIRCULAR_TEXT_FONT;
  context.textAlign = "center";
  context.textBaseline = "middle";

  const text = "LEO DRIESCH \u2022 MMXXVI \u2022";
  const radius = layout.rText;
  for (let index = 0; index < text.length; index += 1) {
    const angle = (index / text.length) * Math.PI * 2 - Math.PI / 2;
    context.save();
    context.rotate(angle);
    context.translate(0, -radius);
    context.fillText(text[index] ?? "", 0, 0);
    context.restore();
  }
  context.restore();

  // Portrait area: photo relief inside inlay
  context.save();
  context.beginPath();
  context.arc(cx, cy, layout.rInlay - 3, 0, Math.PI * 2);
  context.clip();

  const cropSize = Math.min(img.naturalWidth, img.naturalHeight);
  const sourceX = (img.naturalWidth - cropSize) / 2;
  const sourceY = (img.naturalHeight - cropSize) / 2;
  const inset = layout.rInlay * Math.SQRT1_2;
  const side = inset * 2;
  const left = cx - inset;
  const top = cy - inset;

  context.drawImage(
    img,
    sourceX,
    sourceY,
    cropSize,
    cropSize,
    left,
    top,
    side,
    side,
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
