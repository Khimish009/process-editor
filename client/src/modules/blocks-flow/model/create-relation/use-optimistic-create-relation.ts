import { Block, BlockId, getPortPositions, relationFromPorts, type Relation } from "../../domain/block"
import type { PortId } from "../../domain/port"
import type { Position } from "../../domain/position"
import { useSelectedPortStore } from "./use-selected-port-store"

export const useOptimisticCreateRelation = ({
    relations,
    blocksRecord,
    portPositions
}: {
    relations: Relation[]
    blocksRecord: Record<BlockId, Block>
    portPositions: Record<PortId, Position>
}) => {
    const { selectedPort, selectedEndPort } = useSelectedPortStore()

    if (selectedPort && !selectedEndPort) { 
            const tempArrayStartPosition = getPortPositions({
                blocksRecord,
                portPositions,
                port: selectedPort
            })

            return [relations, tempArrayStartPosition] as const
        }

    if (selectedPort && selectedEndPort) {
        const relation = relationFromPorts(selectedPort, selectedEndPort)
        
        return [relations.concat(relation)] as const
    }

    return [relations] as const 
}
