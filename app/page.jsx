'use client';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { TypingBox } from './components/TypingBox';

const Home = () => {
  return ( 
    <div className='relative h-screen w-screen'>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <TypingBox />
      </div>
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience />
      </Canvas>
    </div>
   );
}
 
export default Home;