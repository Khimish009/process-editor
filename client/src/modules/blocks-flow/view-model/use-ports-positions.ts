import { create } from "zustand";
import { Position } from "../domain/position";
import { useCallback } from "react";

type Store = {
  portPositions: Record<string, Position>;
  setPortPosition: (id: string, postion?: Position) => void;
};

const usePortPositionsStore = create<Store>((set) => ({
  portPositions: {},
  setPortPosition: (id: string, postion?: Position) => {
    set((state) => {
      if (postion) {
        return { portPositions: { ...state.portPositions, [id]: postion } };
      }
      return state;
    });
  },
}));

export const usePortPositions = () => {
  return usePortPositionsStore((state) => state.portPositions)
}

export const usePortPositionsReader = (id: string) => {
  const setPortPosition = usePortPositionsStore(state => state.setPortPosition)

  const callbackRef = useCallback((ref: HTMLButtonElement | null) => {
          if (ref) {
              setPortPosition?.(id, {
                  x: ref.offsetLeft + ref.offsetWidth / 2,
                  y: ref.offsetTop + ref.offsetHeight / 2,
              })
          } else {
            setPortPosition?.(id)
          }
      }, [id, setPortPosition])

  return callbackRef
}
