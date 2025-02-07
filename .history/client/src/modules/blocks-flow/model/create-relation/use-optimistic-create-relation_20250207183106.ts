import { relationFromPorts, type Relation } from "../../domain/block"
import { useSelectedPortStore } from "./use-selected-port-store"

export const useOptimisticCreateRelation = (relations: Relation[]) => {
    const { selectedPort, selectedEndPort } = useSelectedPortStore()

    if (selectedPort && selectedEndPort) {
        return [relations, ...relationFromPorts(selectedPort, selectedEndPort)]
    }

    return relations
}
