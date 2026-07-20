"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";

function Blob() {
  const mesh = useRef(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const { pointer } = state;
    mesh.current.rotation.y += 0.003;
    // ease toward the cursor for a subtle parallax
    mesh.current.rotation.x += (pointer.y * 0.3 - mesh.current.rotation.x) * 0.05;
    mesh.current.rotation.z += (pointer.x * 0.2 - mesh.current.rotation.z) * 0.05;
  });

  return (
    <Sphere ref={mesh} args={[1, 96, 96]} scale={2.2}>
      <MeshDistortMaterial
        color="#7C5CFF"
        distort={0.45}
        speed={1.6}
        roughness={0.15}
        metalness={0.4}
      />
    </Sphere>
  );
}

export default function HeroBlob() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={2.2} />
      <pointLight position={[-5, -2, -3]} intensity={2} color="#9E86FF" />
      <Blob />
    </Canvas>
  );
}
