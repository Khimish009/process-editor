import { create } from "zustand"
import { blocksFlowApi } from "../api"
import { Relation, RelationId } from "../domain/block"

export const useDeleteRelations = (
    {
        getRelationsToDelete,
        onComplete,
        afterComplete
    }: {
        getRelationsToDelete: () => RelationId[]
        onComplete: () => Promise<void>, 
        afterComplete: () => void
    }
) => {
    const setIsLoading = useDeleteStore(state => state.setIsLoading)

    return async () => {
        setIsLoading(true)
        await Promise.allSettled(
            getRelationsToDelete().map(id => blocksFlowApi.deleteRelation(id))
        )
        await onComplete()

        setIsLoading(false)
        afterComplete()
    }
}

export const useOptimisticDeleteRelations = (
    relations: Relation[], 
    relationsToDelete: Record<RelationId, boolean>
) => {
    const isLoading = useDeleteStore(state => state.isLoading)

    return isLoading 
        ? relations.filter(relation => !relationsToDelete[relation.id])
        : relations
}

type Store = {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

const useDeleteStore = create<Store>((set) => ({ 
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading })
}))
