import { relationFromPorts, type Relation } from "../../domain/block"
import { useSelectedPortStore } from "./use-selected-port-store"

export const useOptimisticCreateRelation = (relations: Relation[]) => {
    const { selectedPort, selectedEndPort } = useSelectedPortStore()

    if (selectedPort && selectedEndPort) {
        const relation = relationFromPorts(selectedPort, selectedEndPort)
        
        return [...relations, relation]
    }

    return relations 
}
