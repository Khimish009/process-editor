import { create } from "zustand"
import { blocksFlowApi } from "../api"
import { Relation, RelationId } from "../domain/block"

type Store = {
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
}

export const useDeleteStore = create<Store>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading })
}))

export const useDeleteRelation = (
    {
        relationsToDelete,
        onComplete,
        afterComplete
    }: {
        relationsToDelete: RelationId[]
        onComplete: () => Promise<void>, 
        afterComplete: () => void
    }
) => {
    const setIsLoading = useDeleteStore(state => state.setIsLoading)

    return async () => {
        setIsLoading(true)
        await Promise.allSettled(relationsToDelete.map(id => blocksFlowApi.deleteRelation(id)))
        await onComplete()

        setIsLoading(false)
        afterComplete()
    }
}

export const useFilterDeleted = (
    relations: Relation[], 
    relationsToDelete: Record<RelationId, boolean>
) => {
    const isLoading = useDeleteStore(state => state.isLoading)

    return isLoading 
        ? relations.filter(relation => !relationsToDelete[relation.id])
        : relations
}
