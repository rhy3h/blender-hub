import { create } from 'zustand';

type BlenderStore = {
  progressMap: Record<string, number>;
  setProgress: (url: string, progress: number) => void;
};

export const useBlender = create<BlenderStore>()((set) => ({
  progressMap: {},
  setProgress: (url, progress) => set((state) => ({
    progressMap: { ...state.progressMap, [url]: progress },
  })),
}));
