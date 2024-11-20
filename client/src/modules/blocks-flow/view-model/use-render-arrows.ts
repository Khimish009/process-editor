import { useCallback, useMemo, useState } from "react"
import { Position, sumPostition } from "../domain/position"
import { Block } from "../domain/block"
import { getPortId } from "../domain/ports"

export const useRenderArrows = (blocks: Block[]) => {
    const [portPositions, setPortPositions] = useState<Record<string, Position>>()

    const setPortPosition = useCallback((id: string, position?: Position) => {
        setPortPositions((prev) => {
            if (position) {
                return { ...prev, [id]: position }
            }

            return prev
        })
    }, [])

    const blocksRecord = useMemo(() => {
        return blocks.reduce((acc, block) => {
            if (!acc[block.id]) {
                acc[block.id] = block
            }
            return acc
        }, {} as Record<string, Block | undefined>)
    }, [blocks])

    const arrowD = useMemo(() => {
        let d = '';

        for(const block of blocks) {
            for(const input of block.inputs) {
                const inputPortId = getPortId({
                    blockId: input.inputId,
                    port: input.inputPort,
                    type: "input",
                })

                const outputPortId = getPortId({
                    blockId: input.outputId,
                    port: input.outputPort,
                    type: "output",
                })

                const inputPortPosition = portPositions?.[inputPortId]
                const outputPortPosition = portPositions?.[outputPortId]
                const inputBlock = blocksRecord[input.inputId]
                const outputBlock = blocksRecord[input.outputId]

                if (
                    !inputPortPosition ||
                    !outputPortPosition ||
                    !inputBlock ||
                    !outputBlock
                ) {
                    continue
                }

                const inputPosition = sumPostition(inputPortPosition, inputBlock)
                const outputPosition = sumPostition(outputPortPosition, outputBlock)

                d += `M ${inputPosition.x} ${inputPosition.y} L ${outputPosition.x} ${outputPosition.y} `
            }
        }

        return d
    }, [blocks, portPositions, blocksRecord])

    return {
        arrowD,
        setPortPosition
    }
}