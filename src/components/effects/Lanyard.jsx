import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { FiRotateCw } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import {
  createCardTextures,
  createStrapTexture,
} from "../../utils/lanyardTextures";

// Daftarkan "alat gambar tali" supaya bisa dipakai sebagai tag JSX
extend({ MeshLineGeometry, MeshLineMaterial });

// Wadah sementara untuk hitungan (dipakai ulang, jadi hemat memori)
const vec = new THREE.Vector3();
const dir = new THREE.Vector3();
const quat = new THREE.Quaternion();
const euler = new THREE.Euler();

// Bagian atas kotak dibuat memudar, jadi tali seolah muncul dari ketiadaan
const fadeTop = {
  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
  maskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
};

function Band({ flipped, onFlip, maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const { width, height } = useThree((state) => state.size);
  const [textures] = useState(() =>
    createCardTextures("/images/profile/profile.png"),
  );
  const [strap] = useState(() => createStrapTexture());
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  });
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const tap = useRef(null); // mencatat di mana dan kapan pointer ditekan

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };

  // Tali dibuat dari 3 ruas. Tiap ruas maksimal sepanjang 1 satuan.
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  // Ujung tali menempel di bagian atas kartu
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.35, 0],
  ]);

  // Kursor berubah jadi tangan saat di atas kartu
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  // Bangunkan kartu setiap kali sisi yang dituju berganti
  useEffect(() => {
    card.current?.wakeUp();
  }, [flipped]);

  useFrame((state, delta) => {
    // 1) Saat kartu ditarik: kartu mengikuti posisi pointer
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && card.current) {
      // 2) Haluskan gerak tali supaya tidak bergetar
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        }
        const clamped = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clamped * (maxSpeed - minSpeed)),
        );
      });

      // 3) Gambar tali sebagai kurva yang melewati titik-titik ruas
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      // 4) Putar kartu pelan-pelan menuju sisi yang dituju (depan atau belakang)
      const r = card.current.rotation();
      quat.set(r.x, r.y, r.z, r.w);
      euler.setFromQuaternion(quat, "YXZ");
      let diff = (flipped ? Math.PI : 0) - euler.y;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      const ang = card.current.angvel();
      card.current.setAngvel({
        x: ang.x,
        y: ang.y + diff * 15 * delta,
        z: ang.z,
      });
    }
  });

  return (
    <>
      {/* Titik gantung berada di atas layar, jadi tali muncul dari atas */}
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.02]} />

          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);

              // Kalau pointer hampir tidak bergeser dan cepat, itu "klik", bukan "tarik"
              const start = tap.current;
              if (start) {
                const moved = Math.hypot(
                  e.clientX - start.x,
                  e.clientY - start.y,
                );
                const elapsed = performance.now() - start.time;
                if (moved < 6 && elapsed < 400) onFlip();
              }
              tap.current = null;
            }}
            onPointerDown={(e) => {
              tap.current = {
                x: e.clientX,
                y: e.clientY,
                time: performance.now(),
              };
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            {/* Badan kartu */}
            <RoundedBox args={[1.6, 2.25, 0.03]} radius={0.06} smoothness={4}>
              <meshPhysicalMaterial
                color="#0b1230"
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.4}
                metalness={0.5}
              />
            </RoundedBox>

            {/* Sisi depan */}
            <mesh position={[0, 0, 0.0155]}>
              <planeGeometry args={[1.48, 2.13]} />
              <meshPhysicalMaterial
                map={textures.front}
                clearcoat={1}
                clearcoatRoughness={0.2}
                roughness={0.35}
                metalness={0.1}
              />
            </mesh>

            {/* Sisi belakang */}
            <mesh position={[0, 0, -0.0155]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.48, 2.13]} />
              <meshPhysicalMaterial
                map={textures.back}
                clearcoat={1}
                clearcoatRoughness={0.2}
                roughness={0.35}
                metalness={0.1}
              />
            </mesh>

            {/* Klip logam dan cincin tempat tali masuk */}
            <RoundedBox
              args={[0.34, 0.22, 0.07]}
              radius={0.03}
              position={[0, 1.2, 0]}
            >
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={1}
                roughness={0.25}
              />
            </RoundedBox>
            <mesh position={[0, 1.35, 0]}>
              <torusGeometry args={[0.09, 0.025, 16, 32]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={1}
                roughness={0.25}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Tali */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={strap}
          repeat={[-3, 1]}
          lineWidth={0.5}
        />
      </mesh>
    </>
  );
}

export default function Lanyard() {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped((f) => !f);

  return (
    <div className="flex flex-col items-center">
      <div
        className="h-120 w-full md:h-160"
        style={fadeTop}
        role="img"
        aria-label={t("hero.cardAlt")}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 25 }}
          dpr={[1, 2]}
          style={{ touchAction: "pan-y" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={Math.PI} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band flipped={flipped} onFlip={toggleFlip} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        {t("hero.dragHint")}
      </p>
      <button
        type="button"
        onClick={toggleFlip}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur transition hover:bg-blue-600 hover:text-white"
      >
        <FiRotateCw /> {t("hero.flipCard")}
      </button>
    </div>
  );
}
