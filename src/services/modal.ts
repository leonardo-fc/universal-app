import { atom, ReadableAtom } from 'nanostores';

export type ModalStore = ReadableAtom<boolean> & {
  open: () => void;
  close: () => void;
};
export const createModalStore = (initial = false): ModalStore => {
  const { set, ...store } = atom(initial);

  return {
    ...store,
    open: () => set(true),
    close: () => set(false),
  };
};
