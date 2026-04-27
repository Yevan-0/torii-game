import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Torii(props) {
  const { nodes, materials } = useGLTF('/models/torii/torii-gate.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Node-Mesh'].geometry} material={materials.mat23} />
      <mesh geometry={nodes['Node-Mesh_1'].geometry} material={materials.mat14} />
    </group>
  )
}

useGLTF.preload("/models/torii/torii-gate.glb")