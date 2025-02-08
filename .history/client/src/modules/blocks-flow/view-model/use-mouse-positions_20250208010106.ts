import { useCallback, useRef } from "react"
import type { Position } from "../domain/position"
import { create } from "zustand"

export const useMouseListenPosition = () => {
    const unsubscribe = useRef<() => void>()
    const setPosition = usePositionStore((state) => state.setPosition)

    const callback = useCallback((element?: HTMLElement) => {

        if (element) {
            const listener = (e: HTMLElement) =>  ({
                x: e.clientLeft,
                y: e.clientLeft
            })

            element.addEventListener("mousemove", listener)

            unsubscribe.current = element.removeEventListener("mousemove", listener)
        }
    }, [])

    return callback
}

type Store = {
    position?: Position
    setPosition: (position: Position) => void
}

const usePositionStore = create<Store>((set) => ({
    position: undefined,
    setPosition: (position) => set({ position })
}))