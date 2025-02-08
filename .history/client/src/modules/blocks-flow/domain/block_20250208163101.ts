import { getPortId, PortId, Port } from "./port"
import { type Position, sumPosition } from "./position"

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

export const getBlocksRecord = (blocks: Block[]): Record<BlockId, Block> => {
    return blocks.reduce<Record<BlockId, Block>>(
        (acc, block) => {
        acc[block.id] = block;
        return acc;
        },
        {}
    )
};

export const relationFromPorts = (portA: Port, portB: Port) => {
    return portA.type === "input" ?
            {
                id: `${getPortId(portB)}:${getPortId(portA)}`,
                inputId: portA.blockId,
                inputPort: portA.port,
                outputId: portB.blockId,
                outputPort: portB.port
            } :
            {
                id: `${getPortId(portA)}:${getPortId(portB)}`,
                inputId: portB.blockId,
                inputPort: portB.port,
                outputId: portA.blockId,
                outputPort: portA.port
            }
}

export const getPortPositions = ({
    blocksRecord,
    portPositions,
    port,
}: {
    port: Port,
    blocksRecord: Record<BlockId, Block>
    portPositions: Record<PortId, Position>
}) => {
    const portId = getPortId(port)
    const inputPortPosition = portPositions?.[portId] ?? { x: 0, y: 0 };
    const inputBlock = blocksRecord[port.blockId] ?? { x: 0, y: 0 };

    return sumPosition(inputBlock, inputPortPosition);
}

export const getRelationsPositions = ({
    relations,
    blocksRecord,
    portPositions
}: {
    relations: Relation[]
    blocksRecord: Record<BlockId, Block>
    portPositions: Record<PortId, Position>
}) => {
    return relations.map((relation) => {
        const inputPosition = getPortPositions({
            blocksRecord,
            portPositions,
            port: {
                blockId: relation.inputId,
                port: relation.inputPort,
                type: "input",
            }
        });
    
        const outputPosition = getPortPositions({
            blocksRecord,
            portPositions,
            port: {
                blockId: relation.outputId,
                port: relation.outputPort,
                type: "output",
            }
        });
    
        return {
            id: relation.id,
            inputPosition,
            outputPosition
        }
    })
}
