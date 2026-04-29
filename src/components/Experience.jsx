import { Cylinder, MeshReflectorMaterial, OrbitControls, Text3D, Text, Environment, ContactShadows } from "@react-three/drei";
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./Torii";
import { kanas } from "../constant";
import { useGameStore, gameStates } from "../store";
import { useEffect } from "react";
import Kanaspots from "./Kanaspots";
import CharacterController from "./CharacterController";
import Kicker from "./Kicker";
import { Stage } from "./Stage"

export const Experience = () => {
  const gameState = useGameStore((state) => state.gameState);
  const currentKana = useGameStore((state) => state.currentKana);
  const currentStage = useGameStore((state) => state.currentStage)
  const lastWrongKana = useGameStore((state)=> state.lastWrongKana)

  return (
    <>
      <OrbitControls />
      {/* LIGHTS */}
      <Environment preset="sunset" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        castShadow
        color={"#9e69da"} />


      {/* STAGE */}
      <group position-y={-0.92} >
        {/* BACKGROUND */}
        {
          currentKana && (
            <Text position={[0, -0.02, 0]}
             fontSize={1.84}
              rotation-x={-Math.PI /2} 
              font="./fonts/Poppins-ExtraBold.ttf">
              {currentKana.name.toUpperCase()}
              <meshStandardMaterial color={'white'} opacity={0.6} transparent />
            </Text>
          )
        }
        {
          lastWrongKana && (
            <Text position={[0, -0.01, 0]}
             fontSize={1}
              rotation-x={-Math.PI /2} 
              font="./fonts/Poppins-ExtraBold.ttf">
              {lastWrongKana.name.toUpperCase()}
              <meshStandardMaterial color={'red'} opacity={0.6} transparent />
            </Text>
          )
        }
        <RigidBody colliders={false} type="fixed" name="void">
          <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial color="#e3daf7" toneMapped={false} />
          </mesh>
          <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
        </RigidBody>
        {gameState === gameStates.GAME && currentStage >= 2 && <Kicker />}
        <Stage position={[0, -1, 0]} />
        <RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2}>
          <CylinderCollider args={[0.5, 5]} />
        </RigidBody>
        <ContactShadows
          frames={1}
          position={[0, -0.88, 0]}
          scale={80}
          opacity={0.42}
          far={50}
          blur={0.8}
          color={"#aa9acd"}
        />
        <CharacterController />
        <Kanaspots />
      </group>
    </>
  );
};
