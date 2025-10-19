import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import { tokenImg } from "@/assets/images";

const RotatingCoin = () => {
  const coinRef = useRef<any>();
  const texture = useTexture(tokenImg);

  return (
    <mesh ref={coinRef} rotation={[Math.PI / 2, 1.56, 0]}>
      <cylinderGeometry args={[1.4, 1.4, 0.2, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const RotatingCoinCanvas = () => {
  return (
    <Canvas
      className="absolute -top-3 left-1/2 -translate-x-1/2"
      style={{ height: "225px", width: "225px" }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <RotatingCoin />
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
