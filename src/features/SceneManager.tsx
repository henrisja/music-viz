/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import Box from './scenecomponents/foreground/Box';
import WelcomeScreen from './ui/welcomescreen';
import SongControls from './ui/songcontrols';

const SceneManager: React.FC = () => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [duration, setDuration] = React.useState<number>(0);
  const [currentTime, setCurrentTime] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDuration(audioRef.current ? audioRef.current!.duration : 0);
      setCurrentTime(audioRef.current ? audioRef.current!.currentTime : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (!audioFile) {
      return;
    }

    audioRef.current = new Audio(URL.createObjectURL(audioFile));
    audioRef.current.play();
  }, [audioFile]);

  const handleOnSelectPause = (paused: boolean) => {
    if (!audioFile) {
      return;
    }

    paused ? audioRef.current!.pause() : audioRef.current!.play();
  };

  const handleOnAudioFileUpload = (file: File) => {
    setAudioFile(file);
  };

  return audioFile ? (
    <div css={sceneContainerStyling}>
      <SongControls onSelectPause={handleOnSelectPause} currentTime={currentTime} duration={duration} />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  ) : (
    <WelcomeScreen onFileUpload={handleOnAudioFileUpload} />
  );
};

export default SceneManager;

const sceneContainerStyling = css({
  width: window.innerWidth,
  height: window.innerHeight,
});
