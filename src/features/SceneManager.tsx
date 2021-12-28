import * as React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Controls from './controls/Controls';
import Box from './scenecomponents/foreground/Box';

export const SceneManager = () => {
  return (
    <Controls>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </Controls>
  );
};
