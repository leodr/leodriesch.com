import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type PointerState = {
  x: number;
  y: number;
};

type CoinTextures = {
  portrait: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
};

type CoinSceneProps = {
  textures: CoinTextures;
  hovered: boolean;
  pointer: PointerState;
  flipKey: number;
  onFlipChange: (isFlipping: boolean) => void;
};

function CoinScene({
  textures,
  hovered,
  pointer,
  flipKey,
  onFlipChange,
}: CoinSceneProps) {
  const { gl, scene } = useThree();
  const coinRef = useRef<THREE.Mesh>(null);
  const shadowCasterRef = useRef<THREE.Mesh>(null);
  const portraitOverlayRef = useRef<THREE.Mesh>(null);

  const portraitMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const portraitBackMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const rimMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const faceFrontMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const faceBackMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const shadowCasterMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const shadowMatRef = useRef<THREE.ShadowMaterial>(null);

  const tiltRef = useRef({ x: 0, y: 0 });
  const metalnessRef = useRef(0);
  const flipAnimRef = useRef<{ startTime: number; duration: number } | null>(
    null,
  );
  const appliedFlipKeyRef = useRef(0);

  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFShadowMap;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.3;

    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const envMap = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    scene.environment = envMap;

    return () => {
      if (scene.environment === envMap) {
        scene.environment = null;
      }

      envMap.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  useEffect(() => {
    const shadowCasterMaterial = shadowCasterMatRef.current;
    if (!shadowCasterMaterial) {
      return;
    }

    shadowCasterMaterial.colorWrite = false;
    shadowCasterMaterial.depthWrite = false;
  }, []);

  useEffect(() => {
    if (!flipKey || appliedFlipKeyRef.current === flipKey) {
      return;
    }

    appliedFlipKeyRef.current = flipKey;
    flipAnimRef.current = {
      startTime: performance.now(),
      duration: 1100,
    };
    onFlipChange(true);
  }, [flipKey, onFlipChange]);

  useFrame(() => {
    const coin = coinRef.current;
    const shadowCaster = shadowCasterRef.current;
    const portraitOverlay = portraitOverlayRef.current;
    const portraitMat = portraitMatRef.current;
    const portraitBackMat = portraitBackMatRef.current;
    const rimMat = rimMatRef.current;
    const faceFrontMat = faceFrontMatRef.current;
    const faceBackMat = faceBackMatRef.current;
    const shadowMat = shadowMatRef.current;

    if (
      !coin ||
      !shadowCaster ||
      !portraitOverlay ||
      !portraitMat ||
      !portraitBackMat ||
      !rimMat ||
      !faceFrontMat ||
      !faceBackMat ||
      !shadowMat
    ) {
      return;
    }

    const now = performance.now();
    const targetMetal = hovered || flipAnimRef.current ? 1 : 0;

    metalnessRef.current += (targetMetal - metalnessRef.current) * 0.06;

    portraitMat.opacity = 1 - metalnessRef.current;
    portraitBackMat.opacity = 1 - metalnessRef.current;
    portraitOverlay.visible = metalnessRef.current < 0.99;
    rimMat.opacity = metalnessRef.current;
    faceFrontMat.opacity = metalnessRef.current;
    faceBackMat.opacity = metalnessRef.current;
    shadowMat.opacity = metalnessRef.current * 0.25;
    shadowCaster.visible = metalnessRef.current > 0.01;

    if (flipAnimRef.current) {
      const elapsed = now - flipAnimRef.current.startTime;
      const t = Math.min(elapsed / flipAnimRef.current.duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      coin.rotation.x = Math.PI / 2 + Math.PI * 6 * eased;
      coin.position.y = Math.sin(t * Math.PI) * 0.6;
      coin.rotation.z = Math.sin(t * Math.PI * 3) * 0.08 * (1 - t);

      if (t >= 1) {
        flipAnimRef.current = null;
        coin.rotation.x = Math.PI / 2;
        coin.rotation.z = 0;
        coin.position.y = 0;
        onFlipChange(false);
      }
    } else {
      tiltRef.current.x += (-pointer.y * 0.35 - tiltRef.current.x) * 0.08;
      tiltRef.current.y += (pointer.x * 0.35 - tiltRef.current.y) * 0.08;

      coin.rotation.x = Math.PI / 2 + tiltRef.current.x;
      coin.rotation.y = tiltRef.current.y;

      if (hovered) {
        const idleTime = now * 0.001;
        coin.rotation.z = Math.sin(idleTime * 1.5) * 0.015;
      } else {
        coin.rotation.z *= 0.95;
      }
    }

    shadowCaster.rotation.copy(coin.rotation);
    shadowCaster.position.copy(coin.position);
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight
        castShadow
        intensity={1}
        position={[0.5, 0.5, 5]}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.1}
        shadow-camera-far={10}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <directionalLight intensity={0.5} position={[-1.5, 1, 3]} />
      <directionalLight intensity={0.3} position={[0, -1.5, 2]} />

      <mesh ref={coinRef} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.08, 64, 1, false]} />
        <meshPhysicalMaterial
          ref={rimMatRef}
          attach="material-0"
          transparent
          opacity={0}
          metalness={1}
          roughness={0.25}
          color="#ffffff"
          envMapIntensity={1.8}
        />
        <meshPhysicalMaterial
          ref={faceFrontMatRef}
          attach="material-1"
          transparent
          opacity={0}
          metalness={1}
          roughness={0.35}
          color="#ffffff"
          envMapIntensity={1.6}
          bumpMap={textures.bump}
          bumpScale={0.45}
          roughnessMap={textures.roughness}
        />
        <meshPhysicalMaterial
          ref={faceBackMatRef}
          attach="material-2"
          transparent
          opacity={0}
          metalness={1}
          roughness={0.35}
          color="#ffffff"
          envMapIntensity={1.6}
          bumpMap={textures.bump}
          bumpScale={0.45}
          roughnessMap={textures.roughness}
        />

        <mesh ref={portraitOverlayRef} position={[0, 0.002, 0]}>
          <cylinderGeometry args={[1, 1, 0.08, 64, 1, false]} />
          <meshBasicMaterial
            attach="material-0"
            transparent
            opacity={0}
            depthWrite={false}
          />
          <meshBasicMaterial
            ref={portraitMatRef}
            attach="material-1"
            map={textures.portrait}
            transparent
            opacity={1}
            depthWrite={false}
          />
          <meshBasicMaterial
            ref={portraitBackMatRef}
            attach="material-2"
            map={textures.portrait}
            transparent
            opacity={1}
            depthWrite={false}
          />
        </mesh>
      </mesh>

      <mesh ref={shadowCasterRef} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 0.08, 64, 1, false]} />
        <meshBasicMaterial ref={shadowCasterMatRef} />
      </mesh>

      <mesh position={[0, 0, -0.7]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial ref={shadowMatRef} transparent opacity={0} />
      </mesh>
    </>
  );
}

export function CoinPortrait() {
  const [hydrated, setHydrated] = useState(false);
  const [textures, setTextures] = useState<CoinTextures | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled) {
        return;
      }

      const portrait = createPortraitTexture(image);
      const bump = createCoinBumpTexture(image);
      const roughness = createInvertedTexture(bump);

      for (const texture of [portrait, bump, roughness]) {
        texture.center.set(0.5, 0.5);
        texture.rotation = Math.PI / 2;
      }

      setTextures({ portrait, bump, roughness });
    };

    image.src = "/assets/portrait.png";

    return () => {
      cancelled = true;
    };
  }, [hydrated]);

  useEffect(() => {
    return () => {
      if (!textures) {
        return;
      }

      textures.portrait.dispose();
      textures.bump.dispose();
      textures.roughness.dispose();
    };
  }, [textures]);

  return (
    <div
      className={[
        "hero-portrait",
        textures ? "coin-ready" : "",
        hovered || isFlipping ? "coin-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPointer({ x: 0, y: 0 });
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        setPointer({ x, y });
      }}
      onClick={() => {
        if (!hovered || isFlipping || !textures) {
          return;
        }

        setFlipKey((current) => current + 1);
      }}
    >
      <img src="/assets/portrait.png" alt="Leo Driesch" />
      {hydrated && textures ? (
        <Canvas
          className="coin-canvas"
          dpr={[1, 2]}
          shadows
          camera={{ fov: 45, position: [0, 0, 2.6] }}
          gl={{ alpha: true, antialias: true }}
        >
          <CoinScene
            textures={textures}
            hovered={hovered}
            pointer={pointer}
            flipKey={flipKey}
            onFlipChange={setIsFlipping}
          />
        </Canvas>
      ) : null}
    </div>
  );
}

export default CoinPortrait;

function createPortraitTexture(img: HTMLImageElement) {
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

  const cropSize = Math.min(img.naturalWidth, img.naturalHeight);
  const sourceX = (img.naturalWidth - cropSize) / 2;
  const sourceY = (img.naturalHeight - cropSize) / 2;

  context.drawImage(
    img,
    sourceX,
    sourceY,
    cropSize,
    cropSize,
    0,
    0,
    size,
    size,
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCoinBumpTexture(img: HTMLImageElement) {
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

function createInvertedTexture(source: THREE.CanvasTexture) {
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
