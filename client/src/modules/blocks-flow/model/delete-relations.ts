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
        afterComplete?: () => void
    }
) => {
    const setDeletingRelations = useDeleteStore(state => state.setDeletingRelations)

    return async () => {
        const relationsToDelete = getRelationsToDelete()
        setDeletingRelations(relationsToDelete)
        await Promise.allSettled(
            relationsToDelete.map(id => blocksFlowApi.deleteRelation(id))
        )
        
        try {
            afterComplete?.()
            await onComplete()
        } finally {
            setTimeout(() => setDeletingRelations([]))
        }
    }
}

export const useOptimisticDeleteRelations = (
    relations: Relation[], 
) => {
    const deletingRelations = useDeleteStore(state => state.deletingRelations)
    const filterRelation = (relation: Relation) => !deletingRelations.includes(relation.id)

    return deletingRelations.length
        ? relations.filter(filterRelation)
        : relations
}

type Store = {
    deletingRelations: RelationId[],
    setDeletingRelations: (deletingRelations: RelationId[]) => void
}

const useDeleteStore = create<Store>((set) => ({ 
    deletingRelations: [],
    setDeletingRelations: (deletingRelations) => set({ deletingRelations })
}))
