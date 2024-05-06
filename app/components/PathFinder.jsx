"use client";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useChatContext } from "../hooks/useChatAi";
import { botFacialExpressions, corresponding } from "../lib/aiTools";
import { readJsonTranscript } from "../lib/aiUtils";

export function PathFinder(props) {
  const { nodes, materials, scene } = useGLTF("/models/pathfinder.glb");
  
  const {
    lipsync,
    talking,
    standingArguing,
    setBlink,
    acceptingFiles,
    audio,
    rapping,
    animation
  } = useChatContext();
  const group = useRef();
  const { animations: IdleAnimation } = useFBX("/models/animations/sam/Idle.fbx");
  const { animations: AcceptAnimation } = useFBX("/models/animations/sam/accept.fbx");
  const { animations: Talking } = useFBX("/models/animations/sam/Talking.fbx");
  const { animations: Standing_Arguing } = useFBX("/models/animations/sam/Standing_Arguing.fbx");
  const { animations: Rapping } = useFBX("/models/animations/sam/Rapping.fbx");

  IdleAnimation[0].name = "Idle";
  AcceptAnimation[0].name = "Accept";
  Talking[0].name = "Talking";
  Standing_Arguing[0].name = "Standing_Arguing";
  Rapping[0].name = "Rapping";

  const { actions, mixer } = useAnimations(IdleAnimation, group);
  const { actions: acceptActions, mixer: acceptMixer } = useAnimations(AcceptAnimation, group);
  const { actions: talkingActions, mixer: talkingMixer } = useAnimations(Talking, group);
  const { actions: standingArguingActions, mixer: standingArguingMixer } = useAnimations(Standing_Arguing, group);
  const { actions: rappingActions, mixer: rappingMixer } = useAnimations(Rapping, group);   

  
  useEffect(() => {
    
    if (lipsync) {
      const updateMorphTargets = () => {
        const currentTime = mixer.time;
        lipsync.mouthCues.forEach(cue => {
      
          if (currentTime >= cue.start && currentTime <= cue.end) {
            nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[cue.value]] = 1;
          } else {
            nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[cue.value]] = 0;
          }
        });
      };

      mixer.addEventListener('update', updateMorphTargets);
      return () => mixer.removeEventListener('update', updateMorphTargets);
    }
  }, [lipsync, mixer, nodes]);

  useEffect(() => {
    if (talking) {
      talkingActions[Talking[0].name].play();
    } else {
      talkingActions[Talking[0].name].stop();
    }
  }, [talking]);

  useEffect(() => {
    if (standingArguing) {
      standingArguingActions[Standing_Arguing[0].name].play();
    } else {
      standingArguingActions[Standing_Arguing[0].name].stop();
    }
  }, [standingArguing]);

  useEffect(() => {
    if (rapping) {
      rappingActions[Rapping[0].name].play();
    } else {
      rappingActions[Rapping[0].name].stop();
    }
  }, [rapping]);

  useEffect(() => {
    if (actions[animation]) {
      actions[animation]
        .reset()
        .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
        .play();
    }
  }, [animation]);

  useEffect(() => {
    let blinkTimeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Hair"
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/pathfinder.glb");

