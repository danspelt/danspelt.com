'use client';
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useApp } from '@/hooks/useApp';

const EnterAiModeButton = () => {
    const { progress } = useProgress();
    const [isAi3dLoaded, setIsAi3dLoaded] = useState(false);
    
    useEffect(() => {
        console.log(progress);
        if (progress === 100) {
            setIsAi3dLoaded(true);
        }
    }, [progress]);
    return (
        <button
            onClick={onClick}
            className={`${isAi3dLoaded ? 'bg-blue-500 hover:bg-blue-600' : 'hidden'}`}

        >
            Enter AI Mode
        </button>
    );
};

export default EnterAiModeButton;
