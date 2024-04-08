"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  BackSide,
  CubeTextureLoader
} from "three";
import * as THREE from "three";
import { Sam } from "@components/Sam";

extend({ PerspectiveCamera, OrbitControls, THREE });
const RotatingSkybox = () => {
  const { scene } = useThree();
  const ref = useRef();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/sky/1.jpg", "/sky/2.jpg",
    "/sky/3.jpg", "/sky/4.jpg",
    "/sky/5.jpg", "/sky/6.jpg"
  ]);

  useEffect(() => {
    scene.background = texture;
  }, [texture, scene.background]);

  // This will not rotate the scene or "Sam", but only the sphere.
  useFrame(() => (ref.current.rotation.y += 0.001));

  return (
    <mesh ref={ref} visible={false}>
      <sphereBufferGeometry args={[500, 60, 40]} />
      <meshBasicMaterial envMap={texture} side={BackSide} />
    </mesh>
  );
};

export default function View3D() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <ambientLight intensity={0.5} />
      <RotatingSkybox />
      <Sam />
      <OrbitControls enableZoom={false} />
      <Environment preset="sunset" />
    </Canvas>
  );
}