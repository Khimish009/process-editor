import { Block, BlockId, getPortPositions, relationFromPorts, type Relation } from "../../domain/block"
import type { PortId } from "../../domain/port"
import type { Position } from "../../domain/position"
import { useSelectedPortStore } from "./use-selected-port-store"

export const useOptimisticCreateRelation = ({
    relations,
    blocks,
    portPositions
}: {
    relations: Relation[]
    blocks: Record<BlockId, Block>
    portPositions: Record<PortId, Position>
}) => {
    const { selectedPort, selectedEndPort } = useSelectedPortStore()

    if (selectedPort && !selectedEndPort) { 
            const tempArrayStartPosition = getPortPositions({
                blocksRecord: blocks,
                portPositions,
                port: selectedPort
            })

            return [relations, tempArrayStartPosition] as const
        }

    if (selectedPort && selectedEndPort) {
        const relation = relationFromPorts(selectedPort, selectedEndPort)
        
        return [[...relations, relation]] as const
    }

    return [relations] as const 
}
