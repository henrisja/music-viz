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
  audioFile: File | null;
  audioElement: HTMLAudioElement | null;
  audioContext: AudioContext | null;
  togglePaused: () => void;
  setAudioState: (newAudioState: AudioState) => void;
  setAudioFile: (newAudioFile: File) => void;
  setAudioElement: (newAudioElement: HTMLAudioElement) => void;
  setAudioContext: (newAudioContext: AudioContext) => void;
}

const useStore = create<AudioStateStore>((set) => ({
  audioState: { beat: false, volume: 0, fft: [], bpm: 0 },
  paused: false,
  audioFile: null,
  audioElement: null,
  audioContext: null,
  togglePaused: () => set((state) => ({ paused: !state.paused })),
  setAudioState: (newAudioState) => set((_) => ({ audioState: newAudioState })),
  setAudioFile: (newAudioFile) => set((_) => ({ audioFile: newAudioFile })),
  setAudioElement: (newAudioElement) => set((_) => ({ audioElement: newAudioElement })),
  setAudioContext: (newAudioContext) => set((_) => ({ audioContext: newAudioContext })),
}));

export default useStore;
