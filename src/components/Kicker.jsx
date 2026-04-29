import { useRef, useState } from "react";
import { useGameStore, gameStates } from "../store";
import { CuboidCollider, quat, RigidBody } from "@react-three/rapier";
import { reference } from "three/tsl";
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"

export default function Kicker() {
  const KickerRef = useRef();
  const gameState = useGameStore((state) => state.gameState);
  const currentStage = useGameStore((state) => state.currentStage);

  useFrame((_state, delta) => {
    const { gameState, currentStage } = useGameStore.getState()
    if (!KickerRef.current) {
      return;
    }
    const currRotation = quat(KickerRef.current.rotation());
    const incRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      delta * 4
    )
    currRotation.multiply(incRotation)
    KickerRef.current.setNextKinematicRotation(currRotation)
  })
  if (gameState !== gameStates.GAME || currentStage < 2) {
    return null
  }
  return (
    <RigidBody type="kinematicPosition" position={[0, 0.1, 0]} ref={KickerRef}>
      <group position={[3, 0, 0]}>
        <Box args={[1.5, 0.2, 0.2]}>
          <meshStandardMaterial color={"mediumpurple"} />
        </Box>
        <CuboidCollider args={[0.75, 0.1, 0.1]} />
      </group>
    </RigidBody>
  )
}