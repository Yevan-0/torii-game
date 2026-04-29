import { CapsuleCollider, RigidBody, useRapier, vec3 } from "@react-three/rapier"
import { Player } from "./Player"
import { useKeyboardControls } from "@react-three/drei"
import { Controls } from "../App"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useGameStore } from "../store"

const JUMP_FORCE = 0.5;
const MOVEMENT_SPEED = 0.1
const MAX_VEL = 3;

export default function CharacterController() {
  const rigidRef = useRef();
  const characterRef = useRef();
  const isOnFloor = useRef(true);

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump])
  const leftPressed = useKeyboardControls((state) => state[Controls.left])
  const rightPressed = useKeyboardControls((state) => state[Controls.right])
  const forwardPressed = useKeyboardControls((state) => state[Controls.forwad])
  const backwardPressed = useKeyboardControls((state) => state[Controls.backward])

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 }
    if (jumpPressed && isOnFloor.current) {
      impulse.y += JUMP_FORCE
      isOnFloor.current = false
    }

    const linvel = rigidRef.current.linvel()
    let changeRotation = true;

    if (rightPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED
      changeRotation = true
    }
    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED
      changeRotation = true
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED
      changeRotation = true
    }
    if (backwardPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED
      changeRotation = true
    }

    rigidRef.current.applyImpulse(impulse, true);
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z) + Math.PI;
      characterRef.current.rotation.y = angle;
    }
  })

  const resetPosition = () => {
    rigidRef.current.setTranslation(vec3({ x: 0, y: 0, z: 0 }))
    rigidRef.current.setLinvel(({ x: 0, y: 0, z: 0 }))
  }

  useEffect(() => {
    useGameStore.subscribe((state) => state.currentStage, resetPosition)
  }, [])

  return (
    <group>
      <RigidBody
        ref={rigidRef}
        colliders={false}
        scale={[0.5, 0.5, 0.5]}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "void") {
            resetPosition();
          }
        }}
      >
        <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
        <group ref={characterRef}>
          <Player />
        </group>
      </RigidBody>
    </group>
  )
}