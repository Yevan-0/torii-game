import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Player(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/torii-game/models/male/player.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Root003" scale={0.64}>
          <primitive object={nodes.LeftFootCtrl} />
          <primitive object={nodes.RightFootCtrl} />
          <primitive object={nodes.HipsCtrl} />
          <skinnedMesh name="characterMedium" geometry={nodes.characterMedium.geometry} material={materials['skin.001']} skeleton={nodes.characterMedium.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/torii-game/models/male/player.gltf')
