/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// Create FULL IMAGE Front Face Texture (PRESERVING EXACT ASPECT RATIO - NO SQUISHING/GEPENG)
function createFrontCardTexture(userPhotoImg = null) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 717; // Matches exact 2.0 / 2.8 mesh aspect ratio (512 / 2.8 * 2.0 = 716.8)
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const canvasW = 512;
  const canvasH = 717;

  // Dark Vintage Base Fill
  const grad = ctx.createLinearGradient(0, 0, canvasW, canvasH);
  grad.addColorStop(0, '#1A1918');
  grad.addColorStop(0.5, '#282522');
  grad.addColorStop(1, '#1A1918');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Draw Photo with STRICT Natural Aspect Ratio (Cover - No Stretching / No Gepeng)
  if (userPhotoImg && userPhotoImg.complete && userPhotoImg.naturalWidth > 0) {
    const imgW = userPhotoImg.naturalWidth;
    const imgH = userPhotoImg.naturalHeight;
    const canvasAspect = canvasW / canvasH;
    const imgAspect = imgW / imgH;

    let dw, dh, dx, dy;
    if (imgAspect > canvasAspect) {
      dh = canvasH;
      dw = canvasH * imgAspect;
      dx = (canvasW - dw) / 2;
      dy = 0;
    } else {
      dw = canvasW;
      dh = canvasW / imgAspect;
      dx = 0;
      dy = (canvasH - dh) / 2;
    }

    ctx.drawImage(userPhotoImg, dx, dy, dw, dh);
  } else {
    ctx.fillStyle = '#DCC9A9';
    ctx.font = 'bold 80px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ZYM', 256, 360);
  }

  // OUTER BORDER EXTENDED FULL TO THE CORNERS / EDGES
  ctx.strokeStyle = '#DCC9A9';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, canvasW - 14, canvasH - 14);

  // INNER THIN ACCENT BORDER AT THE EDGES
  ctx.strokeStyle = '#1A1918';
  ctx.lineWidth = 3;
  ctx.strokeRect(14, 14, canvasW - 28, canvasH - 28);

  // NAME AND FULLSTACK DEVELOPER OVERLAY AT BOTTOM
  ctx.textAlign = 'center';

  // NAME
  ctx.fillStyle = '#DCC9A9';
  ctx.shadowColor = 'rgba(26, 25, 24, 0.95)';
  ctx.shadowBlur = 12;
  ctx.font = 'bold 34px sans-serif';
  ctx.fillText('ZAIN YARFA MUBAROK', 256, 610);

  // FULLSTACK DEVELOPER
  ctx.fillStyle = '#F8F6EE';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('FULLSTACK DEVELOPER', 256, 655);

  ctx.shadowBlur = 0; // reset shadow

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Create Back Face Texture with Matching Aspect Ratio
function createBackCardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 717;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createLinearGradient(0, 0, 512, 717);
  grad.addColorStop(0, '#282522');
  grad.addColorStop(1, '#1A1918');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 717);

  ctx.strokeStyle = '#DCC9A9';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 498, 703);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#DCC9A9';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('ZAIN YARFA', 256, 140);

  ctx.fillStyle = '#F8F6EE';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('FULLSTACK DEVELOPER', 256, 220);

  ctx.fillStyle = '#4E6851';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('★ 95% Global Clients', 256, 320);
  ctx.fillText('★ Canva & Pitch Deck Specialist', 256, 380);
  ctx.fillText('★ Strategic Communication', 256, 440);

  ctx.fillStyle = '#DCC9A9';
  ctx.font = '16px monospace';
  ctx.fillText('UNIVERSITAS DIAN NUSWANTORO', 256, 550);
  ctx.fillText('SEMARANG, INDONESIA', 256, 580);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Lanyard Strap Pattern Texture
function createDefaultLanyardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#4E6851';
  ctx.fillRect(0, 0, 512, 64);

  ctx.fillStyle = '#DCC9A9';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ZAIN YARFA ★ FULLSTACK DEVELOPER ★ UDINUS 2026 ★', 256, 40);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export default function Lanyard({
  position = [0, 0, 14.5],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  lanyardWidth = 1.2
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} lanyardWidth={lanyardWidth} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="#DCC9A9"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#DCC9A9"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#4E6851"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, lanyardWidth = 1.2 }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();

  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const [userPhotoImg, setUserPhotoImg] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/zain-profile.png?v=' + Date.now();
    img.onload = () => setUserPhotoImg(img);
  }, []);

  const frontMap = useMemo(() => createFrontCardTexture(userPhotoImg), [userPhotoImg]);
  const backMap = useMemo(() => createBackCardTexture(), []);
  const lanyardMap = useMemo(() => createDefaultLanyardTexture(), []);

  // Multi-material for 6 sides of card box (WARM CREAM SAND METALLIC EDGE)
  const cardMaterials = useMemo(() => {
    const edgeMat = new THREE.MeshStandardMaterial({ color: '#DCC9A9', metalness: 0.85, roughness: 0.25 });
    const frontMat = new THREE.MeshPhysicalMaterial({
      map: frontMap,
      clearcoat: isMobile ? 0 : 1,
      clearcoatRoughness: 0.15,
      roughness: 0.5,
      metalness: 0.7
    });
    const backMat = new THREE.MeshPhysicalMaterial({
      map: backMap,
      clearcoat: isMobile ? 0 : 1,
      clearcoatRoughness: 0.15,
      roughness: 0.5,
      metalness: 0.7
    });
    return [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat];
  }, [frontMap, backMap, isMobile]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.48, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current && card.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      const cardTopPos = new THREE.Vector3().copy(card.current.translation()).add(new THREE.Vector3(0, 1.48, 0));
      curve.points[0].copy(cardTopPos);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current && band.current.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -1, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -2, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -3, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -4.5, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.0, 1.4, 0.025]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {/* 3D PHYSICAL ID CARD (2.0 x 2.8) MATCHING 512 x 717 CANVAS ASPECT RATIO */}
            <mesh material={cardMaterials}>
              <boxGeometry args={[2.0, 2.8, 0.05]} />
            </mesh>

            {/* TOP WARM CREAM SAND METALLIC CLIP */}
            <mesh position={[0, 1.48, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
              <meshStandardMaterial color="#DCC9A9" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={lanyardMap}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
