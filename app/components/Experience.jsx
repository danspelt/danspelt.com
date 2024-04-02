'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { CameraControls, ContactShadows, Environment, Text } from '@react-three/drei';
import { useChat } from '../hooks/useChat';
import { Sam } from './Sam';

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState('');
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => loadingText.length > 2 ? '.' : loadingText + '.');
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText('');
    }
  }, [loading]);
  
  if (!loading) return null;

  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={'left'} anchorY={'bottom'}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();

  useEffect(() => {
    // Ensuring cameraControls.current is defined before calling setLookAt
    if (cameraControls.current) {
      cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
    }
  }, []);

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
      <Sam />
      <Suspense fallback={null}>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
      <Environment files="/hdr/office.hdr" background /> 
      <ContactShadows opacity={0.7} />
    </>
  );
};