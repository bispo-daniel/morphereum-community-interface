import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { RotatingCoinCanvasMesh } from ".";

const RotatingCoinCanvas = () => {
  return (
    <Canvas
      className="absolute -translate-x-1/2 -top-3 left-1/2"
      style={{ height: "225px", width: "225px" }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <RotatingCoinCanvasMesh />
        <OrbitControls
          autoRotate
          autoRotateSpeed={12}
          enableZoom={false}
          enableDamping={false}
          enablePan={false}
          enableRotate={false}
        />
      </Suspense>
    </Canvas>
  );
};

export default RotatingCoinCanvas;
