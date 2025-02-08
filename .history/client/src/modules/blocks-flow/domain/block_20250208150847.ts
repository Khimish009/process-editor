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
    const inputPortPosition = portPositions?.[portId];
    const inputBlock = blocksRecord[port.blockId];

    return inputPosition = sumPosition(inputBlock, inputPortPosition);
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
        const inputPortId = getPortId({
            blockId: relation.inputId,
            port: relation.inputPort,
            type: "input",
        });
    
        const outputPortId = getPortId({
            blockId: relation.outputId,
            port: relation.outputPort,
            type: "output",
        });
      
        const inputPortPosition = portPositions?.[inputPortId];
        const outputPortPosition = portPositions?.[outputPortId];
        const inputBlock = blocksRecord[relation.inputId];
        const outputBlock = blocksRecord[relation.outputId];
      
        if (
            !inputPortPosition ||
            !outputPortPosition ||
            !inputBlock ||
            !outputBlock
        ) {
            return null;
        }
      
        const inputPosition = sumPosition(inputBlock, inputPortPosition);
        const outputPosition = sumPosition(outputBlock, outputPortPosition);
    
        return {
            id: relation.id,
            inputPosition,
            outputPosition
        }
    }).filter((x) => !!x)
}
