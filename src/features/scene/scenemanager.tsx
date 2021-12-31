import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import Box from './foreground/Box';
import useStore from '../store/store';

// SceneManager is a container component for the scene. It handles updating the
// AudioState and managing transitions within the scene.
const SceneManager: React.FC = () => {
  const byteFrequencyData = React.useRef<Uint8Array>(new Uint8Array());
  const byteTimeDomainData = React.useRef<Uint8Array>(new Uint8Array());

  //TODO - there's gotta be a way to get all this state through destructuring or something
  const audioElement = useStore((state) => state.audioElement);
  const audioAnalyzer = useStore((state) => state.audioAnalyzer);
  const paused = useStore((state) => state.paused);
  const setAudioState = useStore((state) => state.setAudioState);
  const togglePause = useStore((state) => state.togglePaused);

  React.useEffect(() => {
    if (!audioElement || !audioAnalyzer) {
      return;
    }

    byteFrequencyData.current = new Uint8Array(audioAnalyzer!.frequencyBinCount);
    byteTimeDomainData.current = new Uint8Array(audioAnalyzer!.frequencyBinCount);

    audioElement.play();
    togglePause();
  }, [audioElement, audioAnalyzer]);

  useFrame((state, delta) => {
    if (!paused) {
      //TODO - update the audio state
      audioAnalyzer!.getByteFrequencyData(byteFrequencyData.current);
      audioAnalyzer!.getByteTimeDomainData(byteTimeDomainData.current);

      console.log(byteFrequencyData.current);
    }
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />;
    </>
  );
};

export default SceneManager;
