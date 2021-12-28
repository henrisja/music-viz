import * as React from 'react';
import Button from '@material-ui/core/Button';

interface ControlsProps {
  children: React.ReactNode;
}

const Controls: React.FC<ControlsProps> = ({ children }) => {
  console.log('in controls');

  return (
    <div className="controls-container">
      <Button variant="contained">Hello Button</Button>
      {children}
    </div>
  );
};

export default Controls;
