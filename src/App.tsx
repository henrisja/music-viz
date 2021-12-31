/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import WelcomeScreen from './features/ui/welcomescreen';
import SongControls from './features/ui/songcontrols';
import SceneManager from './features/scene/scenemanager';
import useStore from './features/store/store';

const MainMenu: React.FC = () => {
  const audioElement = useStore((state) => state.audioElement);

  return audioElement ? (
    <div css={sceneContainerStyling}>
      <SongControls />
      <Canvas>
        <SceneManager />
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
  return <MainMenu />;
};

export default App;
