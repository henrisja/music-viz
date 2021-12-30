/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import Box from './scenecomponents/foreground/Box';
import WelcomeScreen from './ui/welcomescreen';
import SongControls from './ui/songcontrols';
import useStore from './store/store';

const SceneManager: React.FC = () => {
  const audioElement = useStore((state) => state.audioElement);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(audioRef.current ? audioRef.current!.currentTime : 0);
  //     setDuration(audioRef.current ? audioRef.current!.duration : 1);
  //   }, 250);
  //   return () => clearInterval(interval);
  // }, []);

  React.useEffect(() => {
    if (!audioElement) {
      return;
    }

    audioElement.play();
  }, [audioElement]);

  // const handleOnSelectPause = (paused: boolean) => {
  //   if (!audioFile) {
  //     return;
  //   }

  //   paused ? audioRef.current!.pause() : audioRef.current!.play();
  // };

  // const handleOnAudioFileUpload = (file: File) => {
  //   setAudioFile(file);
  // };

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

export default SceneManager;

const sceneContainerStyling = css({
  width: window.innerWidth,
  height: window.innerHeight,
});
