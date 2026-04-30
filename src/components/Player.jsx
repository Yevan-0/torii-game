import React, { useEffect, useRef } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useGameStore } from '../store'
import * as THREE from 'three'

const ANIMATIONS = {
  Idle: 'anm_01000004',
  Run: 'anm_01020002'
}
export function Player(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/torii-game/models/male/player.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  const characterState = useGameStore((state) => state.characterState);
  const previousState = useRef(null)

  // play idle animation on mount
  useEffect(() => {
    if (!actions) return
    const action = actions[ANIMATIONS.Idle]
    if (!action) return
    action.reset().fadeIn(0.2).play()
    action.setLoop(THREE.LoopRepeat, Infinity)
    action.timeScale = 0.5
    previousState.current = "Idle"
  }, [actions])

  useEffect(() => {
    if (previousState.current === characterState) return

    const animName = ANIMATIONS[characterState]
    const action = actions[animName]
    if (!action) return

    action.reset().fadeIn(0.2).play()
    action.setLoop(THREE.LoopRepeat, Infinity)
    action.timeScale = 0.5

    previousState.current = characterState

    return () => {
      action.fadeOut(0.2)
    }
  }, [characterState, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="ply_10205700_(merge)" position={[0.178, -0.236, -0.23]} rotation={[Math.PI / 2, 0, 0]} scale={3.5}>
          <primitive object={nodes.ply_10205700} />
          <skinnedMesh name="body" geometry={nodes.body.geometry} material={materials.ply_mat_10205700} skeleton={nodes.body.skeleton} />
          <skinnedMesh name="body2" geometry={nodes.body2.geometry} material={materials.ply_mat_10205700_t} skeleton={nodes.body2.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/torii-game/models/male/player.glb')
