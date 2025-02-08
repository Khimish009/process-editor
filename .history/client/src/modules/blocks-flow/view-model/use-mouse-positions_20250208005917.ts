import { useCallback, useRef } from "react"
import type { Position } from "../domain/position"

export const useMouseListenPosition = () => {
    const unsubscribe = useRef<() => void>()

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

const usePositionStore = 