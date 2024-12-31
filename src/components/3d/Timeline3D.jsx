'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';

function Rocket({ position = [0, 5.5, 0] }) {
  const rocketRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    rocketRef.current.position.y = position[1] + Math.sin(time * 2) * 0.05;
    rocketRef.current.rotation.z = Math.sin(time * 2) * 0.03;
    rocketRef.current.position.x = Math.sin(time) * 0.05;
  });

  return (
    <group ref={rocketRef} position={position} rotation={[0, 0, Math.PI * 0.05]} scale={0.4}>
      {/* Rocket body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 32]} />
        <meshPhongMaterial 
          color="#ec4899"  
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Rocket nose */}
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.15, 0.4, 32]} />
        <meshPhongMaterial 
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Rocket fins */}
      {[0, Math.PI * 2/3, Math.PI * 4/3].map((angle, i) => (
        <mesh key={i} position={[
          Math.sin(angle) * 0.2,
          -0.3,
          Math.cos(angle) * 0.2
        ]} rotation={[0, -angle, Math.PI * 0.15]}>
          <boxGeometry args={[0.3, 0.2, 0.05]} />
          <meshPhongMaterial 
            color="#be185d"  
            emissive="#be185d"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* Rocket window */}
      <mesh position={[0, 0.1, 0.18]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshPhongMaterial 
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function Card({ position, title, date, color, isLeft }) {
  const cardRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    cardRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1;
  });

  const connectionLinePosition = isLeft ? [1.8, 0, 0] : [-1.8, 0, 0];

  return (
    <group position={position}>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.2}
      >
        {/* Card background */}
        <mesh ref={cardRef}>
          <boxGeometry args={[3.2, 1.8, 0.1]} />
          <meshPhongMaterial 
            color={color}
            opacity={0.9}
            transparent
            shininess={100}
          />
        </mesh>

        {/* Title text */}
        <Text
          ref={textRef}
          position={[0, 0.4, 0.1]}
          fontSize={0.18}
          color="white"
          maxWidth={2.8}
          textAlign="left"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        {/* Date text */}
        <Text
          position={[0, -0.4, 0.1]}
          fontSize={0.14}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {date}
        </Text>

        {/* Connection line */}
        <mesh position={connectionLinePosition}>
          <boxGeometry args={[0.6, 0.05, 0.05]} />
          <meshPhongMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Timeline() {
  const events = [
    {
      title: "Web Developer at Neil Squire Society",
      date: "June 2021 - March 2024",
      position: [-4, 4, 0],
      color: "#3b82f6",
      isLeft: true
    },
    {
      title: "Full Stack Developer at Youneeq AI",
      date: "March 2022 - December 2023",
      position: [4, 2, 0],
      color: "#10b981",
      isLeft: false
    },
    {
      title: "Full Stack Engineer at CanAssist",
      date: "May 2015 - June 2021",
      position: [-4, 0, 0],
      color: "#f97316",
      isLeft: true
    },
    {
      title: "Information Technology Developer",
      date: "March 2013 - May 2015",
      position: [4, -2, 0],
      color: "#8b5cf6",
      isLeft: false
    },
    {
      title: "Technology Assistant at CanAssist",
      date: "March 2010 - March 2013",
      position: [-4, -4, 0],
      color: "#14b8a6",
      isLeft: true
    }
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Central timeline line */}
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[0.08, 10, 0.08]} />
        <meshPhongMaterial 
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Timeline cards */}
      {events.map((event, index) => (
        <Card key={index} {...event} />
      ))}

      {/* Connection dots */}
      {events.map((event, index) => (
        <mesh key={`dot-${index}`} position={[0, event.position[1], 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshPhongMaterial 
            color={event.color}
            emissive={event.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Rocket at the top of timeline */}
      <Rocket position={[0, 6, 0]} />
    </>
  );
}

export default function Timeline3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <Timeline />
      </Canvas>
    </div>
  );
}
