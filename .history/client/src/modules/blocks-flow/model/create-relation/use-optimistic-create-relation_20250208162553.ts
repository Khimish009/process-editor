import { Block, BlockId, getPortPositions, relationFromPorts, type Relation } from "../../domain/block"
import { useSelectedPortStore } from "./use-selected-port-store"

export const useOptimisticCreateRelation = ({
    relations,
    blocks
}: {
    relations: Relation[]
    blocks: Record<BlockId, Block>
}) => {
    const { selectedPort, selectedEndPort } = useSelectedPortStore()

    if (selectedPort && !selectedEndPort) { 
            const startPosition = getPortPositions({
                blocksRecord: blocks,
                portPositions,
                port: selectedPort
            })
        }

    if (selectedPort && selectedEndPort) {
        const relation = relationFromPorts(selectedPort, selectedEndPort)
        
        return [...relations, relation]
    }

    return relations 
}
