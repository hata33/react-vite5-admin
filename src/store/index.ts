import { create } from 'zustand';

type Store = {
  count: number;
  actions: {
    increment: () => void;
    decrement: () => void;
  };
};

const useStore = create<Store>((set) => ({
  count: 0,
  actions: {
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  },
}));

export const useCount = () => useStore((state) => state.count);
export const useCountActions = () => useStore((state) => state.actions);
