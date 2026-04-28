import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Text3D, Cylinder, Center } from "@react-three/drei";
import { useGameStore } from "../store";

export default function Kanaspots() {
  const level = useGameStore((state) => state.level);
  const currentKana = useGameStore((state) => state.currentKana);
  const currentStage = useGameStore((state) => state.currentStage);


  console.log("level:", level)
  console.log("currentStage:", currentStage)
  console.log("stage data:", level?.[currentStage])

  if (!level) {
    return null;
  }
  return level[currentStage].map((kana, index) => (
    <group key={kana.name} rotation-y={(index / level[currentStage].length) * Math.PI * 2}>
      <group position-x={3.5} position-z={-3.5}>
        <RigidBody colliders={false} type="fixed">
          <CylinderCollider args={[0.125, 1]} />
          <Cylinder scale={[1, 0.25, 1]} />
        </RigidBody>

        <Center position-y={0.8}>
          {/* KANA */}
          <Text3D
            font={'./fonts/noto-sans.json'}
            size={0.82}
            rotation-y={-(index / level[currentStage].length) * Math.PI * 2}
          >
            {kana.character.hiragana}
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </group>
    </group>
  ))
}