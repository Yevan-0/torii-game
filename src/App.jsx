import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { getGameLevel } from "./store";
import { KeyboardControls } from "@react-three/drei";
import Menu from "./components/Menu";
import { Leva } from "leva";
export const Controls = {
  forwad: "forwad",
  backward: "backward",
  left: "left",
  right: "right",
  jump: "jump"
}

function App() {
  const map = useMemo(() => [
    { name: Controls.forwad, keys: ["ArrowUp", "KeyW"] },
    { name: Controls.backward, keys: ["ArrowDown", "KeyS"] },
    { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
    { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    { name: Controls.jump, keys: ["Space"] }
  ], [])
  return (
    <KeyboardControls map={map}>
      <Leva hidden/>
      <Canvas shadows camera={{ position: [0, 6, 14], fov: 42 }}>
        <color attach="background" color={"#e3daf7"} />
        <Suspense>
          <Physics debug={false}>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      <Menu />
    </KeyboardControls>
  );
}

export default App;
