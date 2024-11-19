import { useState } from "react"
import { Position } from "../domain/position"
import { Block } from "../domain/block"

export const useRenderArrows = (blocks: Block[]) => {
    const [portPositions, setPortPositions] = useState<Record<string, Position>>({})

    console.log(portPositions, blocks)

    const setPortPosition = (id: string, position?: Position) => {
        setPortPositions((prev) => {
            if (position) {
                return { ...prev, [id]: position }
            }

            return prev
        })
    }
    return {
        setPortPosition
    }
}