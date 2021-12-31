/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import Box from './features/scenecomponents/foreground/Box';
import WelcomeScreen from './features/ui/welcomescreen';
import SongControls from './features/ui/songcontrols';
import useStore from './features/store/store';

const SceneManager: React.FC = () => {
  const audioElement = useStore((state) => state.audioElement);

  // TODO - see if this can be done w/o a useEffect hook
  React.useEffect(() => {
    if (!audioElement) {
      return;
    }

    audioElement.play();
  }, [audioElement]);

  return audioElement ? (
    <div css={sceneContainerStyling}>
      <SongControls />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  ) : (
    <WelcomeScreen />
  );
};

const sceneContainerStyling = css({
  width: window.innerWidth,
  height: window.innerHeight,
});

const App: React.FC = () => {
  return <SceneManager />;
};

export default App;
