/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

interface ISongControls {
  onSelectPause(paused: boolean): void;
  duration: number;
  currentTime: number;
}

const SongControls: React.FC<ISongControls> = (props) => {
  const { onSelectPause, duration, currentTime } = props;

  const [paused, setPaused] = React.useState<boolean>(false);

  return (
    <div css={controlContainerStyling}>
      <IconButton
        css={controlElementStyling}
        aria-label="play-button"
        onClick={() => {
          onSelectPause(!paused);
          setPaused((prevPaused) => !prevPaused);
        }}
        color="secondary"
      >
        {paused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
      </IconButton>
      <Typography css={controlElementStyling}>{secondsToFormattedTime(currentTime)}</Typography>
      <Slider css={controlElementStyling} size="small" defaultValue={0} color="secondary" />
      <Typography css={controlElementStyling}>{secondsToFormattedTime(duration)}</Typography>
    </div>
  );
};

export default SongControls;

const secondsToFormattedTime = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
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
