"use client";
import { useApp } from "@/hooks/useApp";
import { useAITeacher } from "@/hooks/useAITeacher";
import {
    CameraControls,
    Environment,
    Float,
    Gltf,
    Html,
    useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, button, useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { Teacher } from "./Teacher";
import { TypingBox } from "./TypingBox";
import { MessagesList } from "./MessagesList";
import { QuickQuestion } from "./QuickQuestion";

const itemPlacement = {
    default: {
        classroom: {
            position: [0.2, -1.7, -2],
        },
        teacher: {
            position: [-1.5, -1.7, -3],
        },
        board: {
            position: [0.45, 0.382, -6],
        },
    },
    alternative: {
        classroom: {
            position: [0.3, -1.7, -1.5],
            rotation: [0, degToRad(-90), 0],
            scale: 0.4,
        },
        teacher: { position: [-1, -1.7, -3] },
        board: { position: [1.4, 0.84, -8] },
    },
};

export const Ai3d = () => {
    const teacher = useAITeacher((state) => state.teacher);
    const classroom = useAITeacher((state) => state.classroom);
    const isAiMode = useApp((state) => state.isAiMode);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth);
            setIsMobile(window.innerWidth > 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    
    return (
        <div className={`${isAiMode ? 'hidden' : ''}`}>
            <div className="z-10 md:justify-center fixed bottom-4 top-4 flex gap-3 flex-wrap justify-stretch">
                <QuickQuestion />
            </div>

            <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
                <TypingBox />
            </div>
            <Leva hidden />
            <Canvas
                camera={{
                    position: [0, 0, 0.0001],
                }}
            >
                <CameraManager />

                <Suspense>
                    <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
                        <Html
                            transform
                            {...itemPlacement[classroom].board}
                            distanceFactor={1}
                        >
                            <BuyMeACoffee />
                            <MessagesList />
                        </Html>
                        <Environment preset="sunset" />
                        <Environment files={["/hdr/1.hdr"]} background />
                        <ambientLight intensity={1.8} color="white" />
                        <Gltf
                            src={`/models/classroom_${classroom}.glb`}
                            {...itemPlacement[classroom].classroom}
                            visible={!isMobile}
                        />
                        <Teacher
                            teacher={teacher}
                            key={teacher}
                            {...itemPlacement[classroom].teacher}
                            scale={1.5}
                            rotation-y={degToRad(20)}
                        />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
};

const CAMERA_POSITIONS = {
    default: [0, 6.123233995736766e-21, 0.0001],
    loading: [
        0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058,
    ],
    speaking: [0, -3.6481333940859815e-7, 0.00009999846226827279],
};

const CAMERA_ZOOMS = {
    default: 1,
    loading: 1.3,
    speaking: 3.1204819420055387,
};

const CameraManager = () => {
    const controls = useRef();
    const loading = useAITeacher((state) => state.loading);
    const currentMessage = useAITeacher((state) => state.currentMessage);

    useEffect(() => {
        if (loading) {
            controls.current?.setPosition(...CAMERA_POSITIONS.loading, true);
            controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
        } else if (currentMessage) {
            controls.current?.setPosition(...CAMERA_POSITIONS.speaking, true);
            controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
        }
    }, [loading]);

    useControls("Helper", {
        getCameraPosition: button(() => {
            const position = controls.current.getPosition();
            const zoom = controls.current.camera.zoom;
            console.log([...position], zoom);
        }),
    });

    return (
        <CameraControls
            ref={controls}
            minZoom={1}
            maxZoom={3}
            polarRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
            azimuthRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
            mouseButtons={{
                left: 1, //ACTION.ROTATE
                wheel: 16, //ACTION.ZOOM
            }}
            touches={{
                one: 32, //ACTION.TOUCH_ROTATE
                two: 512, //ACTION.TOUCH_ZOOM
            }}
        />
    );
};

useGLTF.preload("/models/classroom_default.glb");
useGLTF.preload("/models/classroom_alternative.glb");