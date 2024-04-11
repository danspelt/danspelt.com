import React from 'react';
import View3D from './View3D';
import Dropzone from '@components/Dropzone';

const Home = () => {
  return ( 
    <div className='flex justify-center items-center h-screen w-screen bg-sky-400'>
      <Dropzone className='h-screen w-screen absolute bg-violet-50 z-10 opacity-0' />      
      <View3D />
    </div>
   );
}
 
export default Home;