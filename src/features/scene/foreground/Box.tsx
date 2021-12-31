import * as React from 'react';
import * as THREE from 'three';
import { MeshProps, useFrame } from '@react-three/fiber';

const Box: React.FC<MeshProps> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef<THREE.Mesh>(null!);

  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false);
  const [clicked, click] = React.useState(false);

  // Subscribe this component to the render-loop, crotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Box;
