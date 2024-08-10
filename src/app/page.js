'use client';

import { useApp } from '@/hooks/useApp';
export default function Home() {
  const currentComponent = useApp((state) => state.currentComponent);
  return (
    <div 
      className='flex flex-col items-center justify-center h-screen relative'>
      {currentComponent}
    </div>
  );
}
