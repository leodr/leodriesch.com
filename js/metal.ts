import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

function init() {
  const container = document.querySelector(".hero-portrait") as HTMLElement;
  const img = container?.querySelector("img") as HTMLImageElement;
  if (!container || !img) return;

  function start() {
    container.classList.add("coin-ready");

    const canvas = document.createElement("canvas");
    canvas.className = "coin-canvas";
    container.appendChild(canvas);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.6;

    // ---- Lights (soft studio) ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(0.5, 0.5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 512;
    keyLight.shadow.mapSize.height = 512;
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 10;
    keyLight.shadow.camera.left = -2;
    keyLight.shadow.camera.right = 2;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.radius = 15;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-1.5, 1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, -1.5, 2);
    scene.add(rimLight);

    // ---- Environment map (white room) ----
    const pmremGen = new THREE.PMREMGenerator(renderer);
    const envMap = pmremGen.fromScene(new RoomEnvironment()).texture;
    pmremGen.dispose();

    // ---- Textures ----
    const portraitTexture = createPortraitTexture(img);
    const bumpTexture = createCoinBumpTexture(img);

    for (const tex of [portraitTexture, bumpTexture]) {
      tex.center.set(0.5, 0.5);
      tex.rotation = Math.PI / 2;
    }

    // ---- Coin geometry ----
    const geo = new THREE.CylinderGeometry(1, 1, 0.08, 64, 1, false);

    // Portrait material (fades out during transition)
    const portraitMat = new THREE.MeshBasicMaterial({
      map: portraitTexture,
      transparent: true,
      depthWrite: false,
    });

    // Metallic coin materials (start invisible, fade in on hover)
    const rimMat = new THREE.MeshPhysicalMaterial({
      metalness: 1,
      roughness: 0.25,
      color: 0xffffff,
      envMap,
      envMapIntensity: 1.8,
      transparent: true,
      opacity: 0,
    });

    const faceMat = new THREE.MeshPhysicalMaterial({
      metalness: 1,
      roughness: 0.35,
      color: 0xffffff,
      envMap,
      envMapIntensity: 1.6,
      bumpMap: bumpTexture,
      bumpScale: 0.45,
      roughnessMap: bumpTexture,
      transparent: true,
      opacity: 0,
    });

    // Metal coin (bottom layer — always present)
    const coin = new THREE.Mesh(geo, [rimMat, faceMat, faceMat]);
    coin.rotation.x = Math.PI / 2;
    coin.castShadow = true;
    scene.add(coin);

    // Portrait overlay (top layer — fades out to reveal metal beneath)
    const invisibleMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const portraitOverlay = new THREE.Mesh(geo, [
      invisibleMat,
      portraitMat,
      portraitMat,
    ]);
    // Tiny offset along cylinder axis to prevent z-fighting
    portraitOverlay.position.y = 0.002;
    coin.add(portraitOverlay);

    // ---- Shadow plane behind coin ----
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0 });
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      shadowMat,
    );
    shadowPlane.position.z = -0.7;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // ---- State ----
    let isHovered = false;
    let metalness = 0;
    let flipAnim: { startTime: number; duration: number } | null = null;
    const tilt = { x: 0, y: 0 };
    const targetTilt = { x: 0, y: 0 };

    // ---- Resize ----
    function resize() {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    // ---- Interaction ----
    container.addEventListener("mouseenter", () => {
      isHovered = true;
      container.classList.add("coin-active");
    });

    container.addEventListener("mouseleave", () => {
      isHovered = false;
      targetTilt.x = 0;
      targetTilt.y = 0;
      if (!flipAnim) container.classList.remove("coin-active");
    });

    container.addEventListener("mousemove", (e) => {
      if (!isHovered) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetTilt.x = -y * 0.35;
      targetTilt.y = x * 0.35;
    });

    container.addEventListener("click", () => {
      if (!isHovered || flipAnim) return;
      flipAnim = {
        startTime: performance.now(),
        duration: 1100,
      };
    });

    // ---- Animation loop ----
    (function animate() {
      requestAnimationFrame(animate);

      const now = performance.now();

      // Smooth metalness transition
      const targetMetal = isHovered || flipAnim ? 1 : 0;
      metalness += (targetMetal - metalness) * 0.06;

      // Smooth crossfade: portrait fades out, metal fades in
      portraitMat.opacity = 1 - metalness;
      portraitOverlay.visible = metalness < 0.99;
      rimMat.opacity = metalness;
      faceMat.opacity = metalness;

      // Shadow fades in with metalness
      shadowMat.opacity = metalness * 0.2;

      if (flipAnim) {
        const elapsed = now - flipAnim.startTime;
        const t = Math.min(elapsed / flipAnim.duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        coin.rotation.x = Math.PI / 2 + Math.PI * 6 * eased;
        coin.position.y = Math.sin(t * Math.PI) * 0.6;
        coin.rotation.z = Math.sin(t * Math.PI * 3) * 0.08 * (1 - t);

        if (t >= 1) {
          flipAnim = null;
          coin.rotation.x = Math.PI / 2;
          coin.rotation.z = 0;
          coin.position.y = 0;
          if (!isHovered) container.classList.remove("coin-active");
        }
      } else {
        tilt.x += (targetTilt.x - tilt.x) * 0.08;
        tilt.y += (targetTilt.y - tilt.y) * 0.08;

        coin.rotation.x = Math.PI / 2 + tilt.x;
        coin.rotation.y = tilt.y;

        if (isHovered) {
          const idleT = now * 0.001;
          coin.rotation.z = Math.sin(idleT * 1.5) * 0.015;
        } else {
          coin.rotation.z *= 0.95;
        }
      }

      renderer.render(scene, camera);
    })();
  }

  if (img.complete && img.naturalWidth > 0) start();
  else img.addEventListener("load", start);
}

// ---- Create circular portrait texture (for flat display) ----
function createPortraitTexture(img: HTMLImageElement): THREE.Texture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const cropSize = Math.min(iw, ih);
  const sx = (iw - cropSize) / 2;
  const sy = (ih - cropSize) / 2;
  ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ---- Create coin bump texture (embossed portrait + rim + text) ----
function createCoinBumpTexture(img: HTMLImageElement): THREE.Texture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  // Outer rim
  ctx.strokeStyle = "#c0c0c0";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
  ctx.stroke();

  // Inner rim
  ctx.strokeStyle = "#b0b0b0";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 32, 0, Math.PI * 2);
  ctx.stroke();

  // Text around the rim
  ctx.save();
  ctx.translate(size / 2, size / 2);
  const text = "LEO DRIESCH \u2022 MMXXVI \u2022";
  ctx.fillStyle = "#c0c0c0";
  ctx.font = "bold 18px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textRadius = size / 2 - 22;
  for (let i = 0; i < text.length; i++) {
    const angle = (i / text.length) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.rotate(angle);
    ctx.translate(0, -textRadius);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
  ctx.restore();

  // Portrait inside inner rim
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 38, 0, Math.PI * 2);
  ctx.clip();
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const cropSize = Math.min(iw, ih);
  const sx = (iw - cropSize) / 2;
  const sy = (ih - cropSize) / 2;
  const pad = 38;
  ctx.drawImage(
    img,
    sx,
    sy,
    cropSize,
    cropSize,
    pad,
    pad,
    size - pad * 2,
    size - pad * 2,
  );
  ctx.restore();

  // Steep sigmoid for sharp coin-stamp relief
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    let gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    const norm = gray / 255;
    gray = (1 / (1 + Math.exp(-14 * (norm - 0.5)))) * 255;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.LinearSRGBColorSpace;
  return texture;
}

init();
