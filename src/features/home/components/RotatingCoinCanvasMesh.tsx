import { useTexture } from "@react-three/drei";
import { useRef } from "react";

import { tokenImg } from "@/assets/images";

const RotatingCoinCanvasMesh = () => {
  const coinRef = useRef<any>();
  const texture = useTexture(tokenImg);

  return (
    <mesh ref={coinRef} rotation={[Math.PI / 2, 1.56, 0]}>
      <cylinderGeometry args={[1.4, 1.4, 0.2, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default RotatingCoinCanvasMesh;
