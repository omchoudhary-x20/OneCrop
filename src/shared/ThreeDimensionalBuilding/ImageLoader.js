import { OrbitControls } from "@react-three/drei";
import {
  TextureLoader,
  ImageLoader,
  MeshStandardMaterial,
  SphereGeometry,
} from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

function Box(props) {
  const colourmap = useLoader(
    TextureLoader,
    // "logo192.png"
    props.imagepath
  );
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.y += delta));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 3.5}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={colourmap} />
    </mesh>
  );
}

const ImageDisplay = ({ imgpath }) => {
  //   const imgloder = useLoader(ImageLoader, imgpath);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <Box imagepath={imgpath} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};
export default ImageDisplay;