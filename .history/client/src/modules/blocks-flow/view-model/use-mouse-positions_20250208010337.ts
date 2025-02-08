import { useCallback, useRef } from "react"
import type { Position } from "../domain/position"
import { create } from "zustand"

export const useListenMousePosition = () => {
    const unsubscribe = useRef<() => void>()
    const setPosition = usePositionStore((state) => state.setPosition)

    const callbackRef = useCallback((element?: HTMLElement) => {
        unsubscribe?.current()

        if (element) {
            const listener = (e: HTMLElement) => {
                setPosition({
                    x: e.clientLeft,
                    y: e.clientLeft
                })
            }

            element.addEventListener("mousemove", () => listener)

            unsubscribe.current = element.removeEventListener("mousemove", () => listener)
        }
    }, [])

    return callbackRef
}

type Store = {
    position?: Position
    setPosition: (position: Position) => void
}

const usePositionStore = create<Store>((set) => ({
    position: undefined,
    setPosition: (position) => set({ position })
}))