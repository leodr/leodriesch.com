import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  Physics,
  quat,
  type RapierRigidBody,
  RigidBody,
  useRapier,
  vec3,
} from "@react-three/rapier";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  createCoinBumpTexture,
  createInvertedTexture,
  createPortraitTexture,
  type CoinTextures,
} from "./coin-portrait-textures";

type PointerState = {
  x: number;
  y: number;
};

const COIN_RADIUS = 1;
const COIN_THICKNESS = 0.08;
const COIN_HALF_HEIGHT = COIN_THICKNESS / 2;
const TABLE_HALF_DEPTH = 0.06;
const TABLE_SURFACE_Z = -COIN_HALF_HEIGHT;
const TABLE_CENTER_Z = TABLE_SURFACE_Z - TABLE_HALF_DEPTH;
const CAMERA_POSITION = new THREE.Vector3(0, 0, 20);

type CoinSceneProps = {
  textures: CoinTextures;
  hovered: boolean;
  pointer: PointerState;
  flipKey: number;
  onFlipChange: (isFlipping: boolean) => void;
  interactionRef: {
    current: {
      camera: THREE.Camera | null;
      coin: THREE.Object3D | null;
    };
  };
};

type FlipState = {
  startTime: number;
  torqueApplied: boolean;
  yawSpin: number;
};

type SettleState = {
  startTime: number;
  targetPosition: THREE.Vector3;
  targetRotation: THREE.Quaternion;
};

function CoinScene({
  textures,
  hovered,
  pointer,
  flipKey,
  onFlipChange,
  interactionRef,
}: CoinSceneProps) {
  const { camera, gl, scene } = useThree();
  const { rapier } = useRapier();
  const coinBodyRef = useRef<RapierRigidBody>(null);
  const coinMeshRef = useRef<THREE.Mesh>(null);
  const portraitOverlayRef = useRef<THREE.Mesh>(null);

  const portraitMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const portraitBackMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const rimMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const faceFrontMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const faceBackMatRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const tiltRef = useRef({ x: 0, y: 0 });
  const rollRef = useRef(0);
  const metalnessRef = useRef(0);
  const flipStateRef = useRef<FlipState | null>(null);
  const settleStateRef = useRef<SettleState | null>(null);
  const appliedFlipKeyRef = useRef(0);

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.NoToneMapping;
    gl.toneMappingExposure = 1;
    camera.position.copy(CAMERA_POSITION);
    camera.lookAt(0, 0, 0);

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
  }, [camera, gl, scene]);

  useEffect(() => {
    const body = coinBodyRef.current;
    if (!body || !flipKey || appliedFlipKeyRef.current === flipKey) {
      return;
    }

    const currentRotation = quat(body.rotation());
    const currentPosition = vec3(body.translation());
    const yawSpin = THREE.MathUtils.clamp(pointer.x * 0.28, -0.18, 0.18);

    appliedFlipKeyRef.current = flipKey;
    body.setEnabledTranslations(true, true, true, true);
    body.setBodyType(rapier.RigidBodyType.Dynamic, true);
    body.setTranslation(currentPosition, true);
    body.setRotation(currentRotation, true);
    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    settleStateRef.current = null;

    flipStateRef.current = {
      startTime: performance.now(),
      torqueApplied: false,
      yawSpin,
    };
    onFlipChange(true);
  }, [flipKey, onFlipChange, pointer.x, rapier]);

  useEffect(() => {
    interactionRef.current.camera = camera;
    interactionRef.current.coin = coinMeshRef.current;

    return () => {
      interactionRef.current.camera = null;
      interactionRef.current.coin = null;
    };
  }, [camera, interactionRef]);

  useFrame(() => {
    const coinBody = coinBodyRef.current;
    const portraitOverlay = portraitOverlayRef.current;
    const portraitMat = portraitMatRef.current;
    const portraitBackMat = portraitBackMatRef.current;
    const rimMat = rimMatRef.current;
    const faceFrontMat = faceFrontMatRef.current;
    const faceBackMat = faceBackMatRef.current;

    if (
      !coinBody ||
      !portraitOverlay ||
      !portraitMat ||
      !portraitBackMat ||
      !rimMat ||
      !faceFrontMat ||
      !faceBackMat
    ) {
      return;
    }

    const now = performance.now();
    const targetMetal =
      hovered || flipStateRef.current || settleStateRef.current ? 1 : 0;
    const coinPosition = vec3(coinBody.translation());
    const coinRotation = quat(coinBody.rotation());

    metalnessRef.current += (targetMetal - metalnessRef.current) * 0.06;

    portraitMat.opacity = 1 - metalnessRef.current;
    portraitBackMat.opacity = 1 - metalnessRef.current;
    portraitOverlay.visible = metalnessRef.current < 0.99;
    rimMat.opacity = metalnessRef.current;
    faceFrontMat.opacity = metalnessRef.current;
    faceBackMat.opacity = metalnessRef.current;

    if (flipStateRef.current) {
      const elapsed = now - flipStateRef.current.startTime;
      const depthVelocity = coinBody.linvel().z;
      if (!flipStateRef.current.torqueApplied && elapsed > 120) {
        coinBody.applyTorqueImpulse(
          {
            x: 2.6 + Math.random() * 0.3,
            y: flipStateRef.current.yawSpin,
            z: 0,
          },
          true,
        );
        flipStateRef.current.torqueApplied = true;
      }

      if (
        (elapsed > 520 &&
          coinPosition.z <= 0.002 &&
          Math.abs(depthVelocity) <= 0.08) ||
        (elapsed > 2200 && Math.abs(depthVelocity) <= 0.2)
      ) {
        const frontNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(
          coinRotation,
        );
        const targetRotation =
          frontNormal.z >= 0
            ? new THREE.Quaternion()
            : new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI,
              );

        coinBody.setBodyType(rapier.RigidBodyType.KinematicPositionBased, true);
        coinBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
        coinBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
        settleStateRef.current = {
          startTime: now,
          targetPosition: new THREE.Vector3(coinPosition.x, coinPosition.y, 0),
          targetRotation,
        };
        flipStateRef.current = null;
      }
    } else if (settleStateRef.current) {
      const elapsed = now - settleStateRef.current.startTime;
      const t = Math.min(elapsed / 260, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const nextQuaternion = coinRotation
        .clone()
        .slerp(settleStateRef.current.targetRotation, eased);
      const nextPosition = coinPosition.lerp(
        settleStateRef.current.targetPosition,
        eased,
      );

      coinBody.setNextKinematicRotation(nextQuaternion);
      coinBody.setNextKinematicTranslation(nextPosition);
      coinRotation.copy(nextQuaternion);
      coinPosition.copy(nextPosition);

      if (t >= 1) {
        coinBody.setEnabledTranslations(false, false, true, true);
        settleStateRef.current = null;
        onFlipChange(false);
      }
    } else if (
      coinBody.bodyType() === rapier.RigidBodyType.KinematicPositionBased
    ) {
      tiltRef.current.x += (-pointer.y * 0.14 - tiltRef.current.x) * 0.08;
      tiltRef.current.y += (pointer.x * 0.14 - tiltRef.current.y) * 0.08;
      rollRef.current = hovered
        ? Math.sin(now * 0.0015) * 0.01
        : rollRef.current * 0.92;

      const idleRotation = new THREE.Euler(
        tiltRef.current.x,
        tiltRef.current.y,
        rollRef.current,
      );
      const idleQuaternion = new THREE.Quaternion().setFromEuler(idleRotation);
      const nextQuaternion = coinRotation.clone().slerp(idleQuaternion, 0.14);
      const nextPosition = coinPosition.lerp(new THREE.Vector3(0, 0, 0), 0.16);

      coinBody.setNextKinematicRotation(nextQuaternion);
      coinBody.setNextKinematicTranslation(nextPosition);
      coinRotation.copy(nextQuaternion);
      coinPosition.copy(nextPosition);
    }
  });

  return (
    <>
      <RigidBody
        ref={coinBodyRef}
        type="kinematicPosition"
        colliders={false}
        ccd
        enabledTranslations={[false, false, true]}
        enabledRotations={[true, true, false]}
        linearDamping={0.25}
        angularDamping={1.2}
      >
        <CylinderCollider
          args={[COIN_HALF_HEIGHT, COIN_RADIUS]}
          rotation={[Math.PI / 2, 0, 0]}
          restitution={0.05}
          friction={0.9}
        />
        <mesh ref={coinMeshRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 64, 1, false]}
          />
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
            <cylinderGeometry
              args={[COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, 64, 1, false]}
            />
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
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          args={[5, 5, TABLE_HALF_DEPTH]}
          position={[0, 0, TABLE_CENTER_Z]}
        />
      </RigidBody>
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
  const raycasterRef = useRef(new THREE.Raycaster());
  const interactionRef = useRef<{
    camera: THREE.Camera | null;
    coin: THREE.Object3D | null;
  }>({
    camera: null,
    coin: null,
  });

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

    image.src = "/assets/portrait-cut.png";

    return () => {
      cancelled = true;
    };
  }, [hydrated]);

  useEffect(() => {
    if (!textures) {
      return;
    }

    const timer = setTimeout(() => {
      setFlipKey((current) => current + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [textures]);

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

  const hitCoin = (clientX: number, clientY: number, rect: DOMRect) => {
    const camera = interactionRef.current.camera;
    const coin = interactionRef.current.coin;

    if (!camera || !coin) {
      return false;
    }

    const canvasSize = 2000;
    const canvasLeft = rect.left + rect.width / 2 - canvasSize / 2;
    const canvasTop = rect.top + rect.height / 2 - canvasSize / 2;
    const pointerX = ((clientX - canvasLeft) / canvasSize) * 2 - 1;
    const pointerY = -(((clientY - canvasTop) / canvasSize) * 2 - 1);

    raycasterRef.current.setFromCamera(
      new THREE.Vector2(pointerX, pointerY),
      camera,
    );

    return raycasterRef.current.intersectObject(coin, true).length > 0;
  };

  return (
    <div
      className={`hero-portrait${textures ? " coin-ready" : ""}${hovered || isFlipping ? " coin-active" : ""}`}
      onMouseLeave={() => {
        setHovered(false);
        setPointer({ x: 0, y: 0 });
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const hoveringCoin = textures
          ? hitCoin(event.clientX, event.clientY, rect)
          : false;
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

        setHovered(hoveringCoin);
        setPointer(hoveringCoin ? { x, y } : { x: 0, y: 0 });
      }}
      onClick={(event) => {
        if (!hovered || isFlipping || !textures) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        if (!hitCoin(event.clientX, event.clientY, rect)) {
          return;
        }

        setFlipKey((current) => current + 1);
      }}
    >
      <img src="/assets/portrait-cut.png" alt="Leo Driesch" />
      {hydrated && textures ? (
        <Canvas
          className="coin-canvas"
          dpr={[1, 2]}
          flat
          camera={{
            fov: 45,
            position: CAMERA_POSITION.toArray(),
          }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Physics
              gravity={[0, 0, -12]}
              colliders={false}
              interpolate={false}
            >
              <CoinScene
                textures={textures}
                hovered={hovered}
                pointer={pointer}
                flipKey={flipKey}
                onFlipChange={setIsFlipping}
                interactionRef={interactionRef}
              />
            </Physics>
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}

export default CoinPortrait;
