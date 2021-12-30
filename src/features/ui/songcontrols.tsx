/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import useStore from '../store/store';

const SongControls: React.FC = (props) => {
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(1);

  const audioElement = useStore((state) => state.audioElement);
  const paused = useStore((state) => state.paused);
  const togglePaused = useStore((state) => state.togglePaused);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(audioElement ? audioElement!.currentTime : 0);
      setDuration(audioElement ? audioElement!.duration : 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div css={controlContainerStyling}>
      <IconButton
        css={controlElementStyling}
        aria-label="play-button"
        onClick={() => {
          if (audioElement) {
            paused ? audioElement!.play() : audioElement!.pause();
          }
          togglePaused();
        }}
        color="secondary"
      >
        {paused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
      </IconButton>
      <Typography css={controlElementStyling}>{secondsToFormattedTime(currentTime)}</Typography>
      <Slider
        css={controlElementStyling}
        size="small"
        value={(currentTime / duration) * 100}
        defaultValue={0}
        color="secondary"
      />
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
  left: '35%',
  width: '30%',
  zIndex: 1,
});

const controlElementStyling = css({
  margin: '10px',
});
