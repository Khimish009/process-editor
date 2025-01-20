import { create } from "zustand"
import { blocksFlowApi } from "../api"
import { Relation, RelationId } from "../domain/block"

type Store = {
    isLoading: boolean
    deleteRelations: (params: {
        relationsToDelete: RelationId[]
        onComplete: () => Promise<void>, 
        afterComplete: () => void
    }) => Promise<void>
    filterDeleted: (
        relations: Relation[], 
        relationsToDelete: Record<RelationId, Relation>
    ) => Relation[]
}

export const useDeleteRelation = create<Store>((set, get) => ({
    isLoading: false,
    deleteRelations: async ({ relationsToDelete, onComplete, afterComplete }) => {
        set({ isLoading: true })
        await Promise.allSettled(relationsToDelete.map(id => blocksFlowApi.deleteRelation(id)))
        await onComplete()

        set({ isLoading: false })
        afterComplete()
    },
    filterDeleted: (relations, relationsToDelete) => {
        if (get().isLoading) {
            return relations.filter(relation => !relationsToDelete[relation.id])
        } 

        return relations
    }
}))
