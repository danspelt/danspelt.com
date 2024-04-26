"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { useChatContext } from "../hooks/useChatAi";
import { Sam } from "./Sam";

const Dots = (props) => {
  const { isLoading } = useChatContext();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) =>
          loadingText.length > 2 ? "." : loadingText + "."
        );
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [isLoading]);

  if(!isLoading) return null;

  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {
  const cameraControls = useRef();
  const [cameraZoomed, setCameraZoomed] = useState(true);
  useEffect(() => {
    // Safely accessing cameraControls.current
    if (cameraControls.current) {
      if (cameraZoomed) {
        cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
      } else {
        cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
      }
    }
  }, [cameraZoomed]);

  return (
    <>
      <CameraControls ref={cameraControls} />      
      <Suspense fallback={null}>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
      <Sam />
      <Environment files="/hdr/1.hdr" background />
      
    </>
  );
};
