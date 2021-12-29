/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import Box from './scenecomponents/foreground/Box';
import WelcomeScreen from './ui/welcomescreen';
import IconButton from '@mui/material/IconButton';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const SceneManager: React.FC = () => {
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [paused, setPaused] = React.useState<boolean>(false);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  // const audioContextRef = React.useRef();

  React.useEffect(() => {
    if (!audioFile) {
      return;
    }

    audioRef.current = new Audio(URL.createObjectURL(audioFile));
    audioRef.current.play();
  }, [audioFile]);

  const handleOnAudioFileUpload = (file: File) => {
    setAudioFile(file);
  };

  return audioFile ? (
    <div css={sceneContainerStyling}>
      <div css={controlContainerStyling}>
        <IconButton
          css={controlElementStyling}
          aria-label="play-button"
          onClick={() => {
            setPaused((prevPaused) => !prevPaused);
          }}
          color="secondary"
        >
          {paused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
        </IconButton>
        <Typography css={controlElementStyling}>{secondsToFormattedTime(0)}</Typography>
        <Slider css={controlElementStyling} size="small" defaultValue={0} color="secondary" />
        <Typography css={controlElementStyling}>{secondsToFormattedTime(200)}</Typography>
      </div>
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

const secondsToFormattedTime = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const controlContainerStyling = css({
  alignItems: 'center',
  backgroundColor: '#e0e0e0',
  borderRadius: '25px',
  bottom: '10px',
  display: 'flex',
  flexDirection: 'row',
  height: '50px',
  padding: '10px',
  position: 'absolute',
  right: '25%',
  width: '50%',
  zIndex: 1,
});

const controlElementStyling = css({
  margin: '10px',
});

const sceneContainerStyling = css({
  width: window.innerWidth,
  height: window.innerHeight,
});
