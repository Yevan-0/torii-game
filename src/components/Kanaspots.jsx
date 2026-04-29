import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Text3D, Cylinder, Center } from "@react-three/drei";
import { useGameStore } from "../store";

export default function Kanaspots() {
  const level = useGameStore((state) => state.level);
  const kanaTouched = useGameStore((state) => state.kanaTouched);
  const currentStage = useGameStore((state) => state.currentStage);
  const mode = useGameStore((state) => state.mode);

  if (!level) {
    return null;
  }
  return level[currentStage].map((kana, index) => (
    <group
      key={`${currentStage}-${kana.name}`}
      rotation-y={(index / level[currentStage].length) * Math.PI * 2}>
      <group position-x={3.5} position-z={-3.5}>
        <RigidBody colliders={false} type="fixed" onCollisionEnter={() => {
          kanaTouched(kana);
        }}>
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
            {mode == "hiragana" ? kana.character.hiragana : kana.character.katakana}
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </group>
    </group>
  ))
}