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
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { Leva } from "leva";

extend({ PerspectiveCamera, OrbitControls, THREE });

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
