import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';

interface ControlsProps {
  children: React.ReactNode;
}

const Controls: React.FC<ControlsProps> = (props) => {
  const { children } = props;

  const [paused, setPaused] = React.useState<boolean>(true);

  return (
    <div className="controls-container">
      <IconButton aria-label="play-button" onClick={() => setPaused(!paused)}>
        {paused ? <PlayArrowOutlinedIcon /> : <PauseOutlinedIcon />}
      </IconButton>
      {children}
    </div>
  );
};

export default Controls;
