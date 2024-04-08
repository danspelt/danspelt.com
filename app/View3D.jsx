"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Loader,
} from "@react-three/drei";

import { BackSide, CubeTextureLoader } from "three";
import * as THREE from "three";
import { Experience } from "@components/Experience";
import { UI } from "@components/UI";
import { Leva } from "leva";

extend({ PerspectiveCamera, OrbitControls, THREE });
const RotatingSkybox = () => {
  const { scene } = useThree();
  const ref = useRef();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/sky/1.jpg",
    "/sky/2.jpg",
    "/sky/3.jpg",
    "/sky/4.jpg",
    "/sky/5.jpg",
    "/sky/6.jpg",
  ]);

  useEffect(() => {
    scene.background = texture;
  }, [texture, scene.background]);

  // This will not rotate the scene or "Sam", but only the sphere.
  useFrame(() => (ref.current.rotation.y += 0.1));

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial envMap={texture} side={BackSide} />
    </mesh>
  );
};

export default function View3D() {
  return (
    <>
      <Loader />
      <Leva hidden={true} />
      <UI />
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience />
      </Canvas>
    </>
  );
}
