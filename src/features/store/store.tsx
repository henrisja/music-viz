import create from 'zustand';

type AudioState = {
  beat: boolean;
  volume: number;
  fft: Array<number>;
  bpm: number;
};

interface AudioStateStore {
  audioState: AudioState;
  paused: boolean;
  audioElement: HTMLAudioElement | null;
  audioContext: AudioContext | null;
  audioSource: MediaElementAudioSourceNode | null;
  audioAnalyzer: AnalyserNode | null;
  togglePaused: () => void;
  setAudioState: (newAudioState: AudioState) => void;
  setAudioElement: (newAudioElement: HTMLAudioElement) => void;
  setAudioAnalyzerComponents: (newAudioElement: HTMLAudioElement) => void;
}

const useStore = create<AudioStateStore>((set) => ({
  audioState: { beat: false, volume: 0, fft: [], bpm: 0 },
  paused: true,
  audioElement: null,
  audioContext: null,
  audioSource: null,
  audioAnalyzer: null,
  togglePaused: () => set((state) => ({ paused: !state.paused })),
  setAudioState: (newAudioState) => set((_) => ({ audioState: newAudioState })),
  setAudioElement: (newAudioElement) => set((_) => ({ audioElement: newAudioElement })),
  setAudioAnalyzerComponents: (newAudioElement) => {
    const context = new AudioContext();
    // does it need to be playing before this?
    const source = context.createMediaElementSource(newAudioElement);
    // why would I ever want to spell analyzer with an s?
    const analyzer = context.createAnalyser();
    analyzer.fftSize = 512;

    source.connect(analyzer);
    analyzer.connect(context.destination);

    set((_) => ({
      audioElement: newAudioElement,
      audioContext: context,
      audioSource: source,
      audioAnalyzer: analyzer,
    }));
  },
}));

export default useStore;
