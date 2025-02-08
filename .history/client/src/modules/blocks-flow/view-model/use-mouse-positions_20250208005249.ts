import { useCallback, useRef } from "react"

export const useMouseListenPosition = () => {
    const unsubscribe = useRef<() => void>()

    const callback = useCallback((element?: HTMLElement) => {

        if (element) {
            const listener = {
                x: element
            }
        }
    }, [])

    return callback
}