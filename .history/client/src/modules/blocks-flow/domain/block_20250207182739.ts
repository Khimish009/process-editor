import { getPortId, type Port } from "./port"

export type BlockId = string

export type Block = {
    id: BlockId
    name: string
    type: string
    data: string

    x: number
    y: number

    inputs: Relation[]
    outputs: Relation[]
}
export type RelationId = string

export type Relation = {
    id: RelationId
    inputId: string 
    inputPort: string
    outputId: string
    outputPort: string
}

export const blocksRelations = (blocks: Block[]): Relation[] => blocks.flatMap(({ inputs }) => inputs)

export const blocksRecord = (blocks: Block[]): Record<BlockId, Block> => {
    return blocks.reduce<Record<BlockId, Block>>(
        (acc, block) => {
        acc[block.id] = block;
        return acc;
        },
        {}
    )
};

export const relationFromPorts = (portA: Port, portB: Port) => {
    const id = `${getPortId(portA)}:${getPortId(portB)}`

    return portA.type === "input" ?
            {
                id,
                inputId: portA.blockId,
                inputPort: portA.port,
                outputId: portB.blockId,
                outputPort: portB.port
            } :
            {
                id,
                inputId: portB.blockId,
                inputPort: portB.port,
                outputId: portA.blockId,
                outputPort: portA.port
            }
}
