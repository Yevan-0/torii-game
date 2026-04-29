import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Text3D, Cylinder, Center, Sphere } from "@react-three/drei";
import { useGameStore } from "../store";
import { useControls } from "leva";

export default function Kanaspots() {
  const level = useGameStore((state) => state.level);
  const kanaTouched = useGameStore((state) => state.kanaTouched);
  const currentStage = useGameStore((state) => state.currentStage);
  const mode = useGameStore((state) => state.mode);

  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: false,
    samples: { value: 7, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.0, min: 0, max: 10, step: 0.01 },
    ior: { value: 0, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0, min: 0, max: 1 },
    anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 3.74, min: 0, max: 10, step: 0.01 },
    attenuationColor: '#ffffff',
    color: '#ffa3cf',
    bg: '#ffffff'
  })

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
        <Sphere scale={[1.22, 1.22, 1.22]} position={[0, 0.8, 0]}>
          <meshPhysicalMaterial {...config} />
        </Sphere>
        <Center position-y={0.8}>
          {/* KANA */}
          <Text3D
            font={'./fonts/noto-sans.json'}
            size={0.82}
            rotation-y={-(index / level[currentStage].length) * Math.PI * 2}
          >
            {mode == "hiragana" ? kana.character.hiragana : kana.character.katakana}
            <meshNormalMaterial color="#ebbe89" toneMapped={false}/>
          </Text3D>
        </Center>
      </group>
    </group>
  ))
}