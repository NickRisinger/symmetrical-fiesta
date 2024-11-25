import { create } from 'zustand';

interface Store {
  planes: Array<any>;
  addPlane: (plane: any) => void;
  getPlane: (id: string) => any;
}

export const useStore = create<Store>((set, get) => ({
  planes: [],

  addPlane: (plane: any) =>
    set((state) => ({ planes: state.planes.concat(plane) })),
  getPlane: (id: string) => get().planes.find((item) => item.id === id),
}));
