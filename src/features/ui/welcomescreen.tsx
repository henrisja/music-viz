/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import Dropzone from 'react-dropzone';
import useStore from '../store/store';

const WelcomeScreen: React.FC = () => {
  const [fileRejected, setFileRejected] = React.useState<boolean>(false);

  const setAudioAnalyzerComponents = useStore((state) => state.setAudioAnalyzerComponents);

  const handleOnFileAccepted = <T extends File>(files: T[]) => {
    setFileRejected(false);
    setAudioAnalyzerComponents(new Audio(URL.createObjectURL(files[0])));
  };

  const handleOnFileRejected = () => {
    setFileRejected(true);
  };

  return (
    <Dropzone
      accept="audio/*"
      onDropAccepted={handleOnFileAccepted}
      onDropRejected={handleOnFileRejected}
      maxSize={10000000}
    >
      {({ getRootProps, getInputProps }) => (
        <div css={dropzoneStyling} {...getRootProps()}>
          <input {...getInputProps()} />
          {fileRejected ? (
            <div>
              <div> File Upload was Rejected... Please try again </div>
              <div> Did you use a valid audio file less than 10 MB? </div>
            </div>
          ) : (
            <div>
              <div> Welcome to my music visualizer! </div>
              <div> To get started uploade an audio file... </div>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default WelcomeScreen;

const dropzoneStyling = css({
  width: window.innerWidth,
  height: window.innerHeight,
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#fafafa',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});
