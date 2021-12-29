/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import Box from './scenecomponents/foreground/Box';
import IconButton from '@mui/material/IconButton';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const SceneManager: React.FC = () => {
  const [paused, setPaused] = React.useState<boolean>(true);

  return (
    <div css={sceneContainerStyling}>
      <div css={controlContainerStyling}>
        <IconButton
          css={controlElementStyling}
          aria-label="play-button"
          onClick={() => setPaused(!paused)}
          color="secondary"
        >
          {paused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
        </IconButton>
        <Typography css={controlElementStyling}>{'0:00'}</Typography>
        <Slider css={controlElementStyling} aria-label="song-slider" size="small" defaultValue={0} color="secondary" />
        <Typography css={controlElementStyling}>{'1:00'}</Typography>
      </div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default SceneManager;

const controlContainerStyling = css({
  alignItems: 'center',
  backgroundColor: 'grey',
  bottom: '0px',
  display: 'flex',
  flexDirection: 'row',
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
