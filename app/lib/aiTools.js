import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import { useChatContext } from "../hooks/useChatAi";
import * as THREE from "three";


let setupMode = false;

const facialExpressions = {
    default: {},
    smile: {
        browInnerUp: 0.17,
        eyeSquintLeft: 0.4,
        eyeSquintRight: 0.44,
        noseSneerLeft: 0.17,
        noseSneerRight: 0.14,
        mouthPressLeft: 0.61,
        mouthPressRight: 0.41,
    },
    funnyFace: {
        jawLeft: 0.63,
        mouthPucker: 0.53,
        noseSneerLeft: 1,
        noseSneerRight: 0.39,
        mouthLeft: 1,
        eyeLookUpLeft: 1,
        eyeLookUpRight: 1,
        cheekPuff: 1,
        mouthDimpleLeft: 0.41,
        mouthRollLower: 0.32,
        mouthSmileLeft: 0.35,
        mouthSmileRight: 0.35,
    },
    sad: {
        mouthFrownLeft: 1,
        mouthFrownRight: 1,
        mouthShrugLower: 0.78,
        browInnerUp: 0.45,
        eyeSquintLeft: 0.72,
        eyeSquintRight: 0.75,
        eyeLookDownLeft: 0.5,
        eyeLookDownRight: 0.5,
        jawForward: 1,
    },
    surprised: {
        eyeWideLeft: 0.5,
        eyeWideRight: 0.5,
        jawOpen: 0.35,
        mouthFunnel: 1,
        browInnerUp: 1,
    },
    angry: {
        browDownLeft: 1,
        browDownRight: 1,
        eyeSquintLeft: 1,
        eyeSquintRight: 1,
        jawForward: 1,
        jawLeft: 1,
        mouthShrugLower: 1,
        noseSneerLeft: 1,
        noseSneerRight: 0.42,
        eyeLookDownLeft: 0.16,
        eyeLookDownRight: 0.16,
        cheekSquintLeft: 1,
        cheekSquintRight: 1,
        mouthClose: 0.23,
        mouthFunnel: 0.63,
        mouthDimpleRight: 1,
    },
    crazy: {
        browInnerUp: 0.9,
        jawForward: 1,
        noseSneerLeft: 0.57,
        noseSneerRight: 0.51,
        eyeLookDownLeft: 0.39,
        eyeLookUpRight: 0.40,
        eyeLookInLeft: 0.96,
        eyeLookInRight: 0.96,
        jawOpen: 0.96,
        mouthDimpleLeft: 0.96,
        mouthDimpleRight: 0.96,
        mouthStretchLeft: 0.28,
        mouthStretchRight: 0.29,
        mouthSmileLeft: 0.56,
        mouthSmileRight: 0.38,
        tongueOut: 0.96,
    },
};

const corresponding = {
    A: "viseme_PP",
    B: "viseme_kk",
    C: "viseme_I",
    D: "viseme_AA",
    E: "viseme_O",
    F: "viseme_U",
    G: "viseme_FF",
    H: "viseme_TH",
    X: "viseme_PP",
};

export function useCustomFrame(nodes, scene) {
    const { facialExpression, blink, winkLeft, winkRight, message, audio, lipsync } = useChatContext();
    useFrame(() => {
        if (!setupMode && scene) {
            Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
                const mapping = facialExpressions[facialExpression];
                if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
                    return;
                }
                if (mapping && mapping[key]) {
                    lerpMorphTarget(key, mapping[key], 0.1, scene);
                } else {
                    lerpMorphTarget(key, 0, 0.1, scene);
                }
            });
 
            lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5, scene);
            lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5, scene);
            
            const appliedMorphTargets = [];
            if (lipsync && message) {
                const currentAudioTime = audio.currentTime;
                lipsync.mouthCues.forEach((mouthCue) => {
                    if (currentAudioTime >= mouthCue.start && currentAudioTime <= mouthCue.end) {
                        appliedMorphTargets.push(corresponding[mouthCue.value]);
                        console.log("cue", mouthCue.value);
                        lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2, scene);
                        return;
                    }
                });
            }

            Object.values(corresponding).forEach((value) => {
                if (!appliedMorphTargets.includes(value)) {
                    lerpMorphTarget(value, 0, 0.1, scene);
                }
            });
        }
    });
}

export function useCustomControls() {
    const { setWinkLeft, setWinkRight, setAnimation, setFacialExpression } = useChatContext();
    useControls("FacialExpressions", {
        chat: button(() => chat()),
        winkLeft: button(() => {
            setWinkLeft(true);
            setTimeout(() => setWinkLeft(false), 300);
        }),
        winkRight: button(() => {
            setWinkRight(true);
            setTimeout(() => setWinkRight(false), 300);
        }),
        animation: {
            options: Object.keys(actions),
            onChange: setAnimation,
        },
        facialExpression: {
            options: Object.keys(facialExpressions),
            onChange: setFacialExpression,
        },
        enableSetupMode: button(() => {
            setupMode = true;
        }),
        disableSetupMode: button(() => {
            setupMode = false;
        }),
        logMorphTargetValues: button(() => {
            const emotionValues = {};
            Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
                if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
                    return;
                }
                const value = nodes.EyeLeft.morphTargetInfluences[nodes.EyeLeft.morphTargetDictionary[key]];
                if (value > 0.01) {
                    emotionValues[key] = value;
                }
            });
            console.log(JSON.stringify(emotionValues, null, 2));
        }),
    });
}

const lerpMorphTarget = (target, value, speed = 0.1, scene) => {
    if (scene && scene.traverse) {
        scene.traverse((child) => {
            if (child.isSkinnedMesh && child.morphTargetDictionary) {
                const index = child.morphTargetDictionary[target];
                if (index !== undefined && child.morphTargetInfluences[index] !== undefined) {
                    child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
                        child.morphTargetInfluences[index],
                        value,
                        speed
                    );
                }
            }
        });
    }
};

