import { create } from 'zustand';

interface AnimationStore {
  animationCompletionStatus: Record<string, boolean>;
  setAnimationCompletionStatus: (name: string) => void;
}

const useAnimationStore = create<AnimationStore>((set) => ({
  animationCompletionStatus: {},
  setAnimationCompletionStatus: (name: string) =>
    set((state) => ({
      animationCompletionStatus: {
        ...state.animationCompletionStatus,
        [name]: true,
      },
    })),
}));

export default useAnimationStore;
