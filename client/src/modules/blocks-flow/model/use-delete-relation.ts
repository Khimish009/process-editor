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
}

export const useDeleteRelation = create<Store>((set) => ({
    isLoading: false,
    deleteRelations: async ({ relationsToDelete, onComplete, afterComplete }) => {
        set({ isLoading: true })
        await Promise.allSettled(relationsToDelete.map(id => blocksFlowApi.deleteRelation(id)))
        await onComplete()

        set({ isLoading: false })
        afterComplete()
    }
}))

export const useFilterDeleted = (
    relations: Relation[], 
    relationsToDelete: Record<RelationId, boolean>
) => {
    const isLoading = useDeleteRelation(state => state.isLoading)

    return isLoading 
        ? relations.filter(relation => !relationsToDelete[relation.id])
        : relations
}
