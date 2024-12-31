'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

function ThreeCanvas() {
  const { Canvas } = require('@react-three/fiber');
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

const DynamicCanvas = dynamic(() => Promise.resolve(ThreeCanvas), { ssr: false });

export default function ClientWrapper() {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <DynamicCanvas />
    </div>
  );
}