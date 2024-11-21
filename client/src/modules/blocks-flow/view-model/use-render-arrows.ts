import { Position, sumPostition } from "../domain/position"
import { Block } from "../domain/block"
import { getPortId } from "../domain/port"
import { create } from "zustand"

type Store = {
    portPositions: Record<string, Position>
    setPortPosition: (id: string, position?: Position) => void
    getArrowsD: (blocks: Block[]) => string
}

export const useRenderArrows = create<Store>((set, get) => ({
    portPositions: {},
    setPortPosition: (id, position) => {
        if (position) {
            set({
                portPositions: { ...get().portPositions, [id]: position }
            })
        }
    },
    getArrowsD: (blocks: Block[]) => {
        let d = '';

        const blocksRecord = blocks.reduce((acc, block) => {
            if (!acc[block.id]) {
                acc[block.id] = block
            }
            return acc
        }, {} as Record<string, Block | undefined>)

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

                const inputPortPosition = get().portPositions?.[inputPortId]
                const outputPortPosition = get().portPositions?.[outputPortId]
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
    },
}))
