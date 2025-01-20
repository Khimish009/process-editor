import { useState } from "react"
import { blocksFlowApi } from "../api"
import { Relation, RelationId } from "../domain/block"

export const useDeleteRelation = ({
    relationsToDelete,
    onComplete,
    afterComplete
}: {
    relationsToDelete: RelationId[]
    onComplete: () => Promise<void>
    afterComplete: () => void
}) => {
    const [isLoading, setIsLoading] = useState(false)
 
    const deleteRelations = async () => { 
        setIsLoading(true)
        await Promise.allSettled(relationsToDelete.map(id => blocksFlowApi.deleteRelation(id)))
        await onComplete()

        setIsLoading(false)
        afterComplete()
    }

    const filterDeleted = (relations: Relation[]) => {
        if (isLoading) {
            return relations.filter(relation => !relationsToDelete.includes(relation.id))
        } 

        return relations
    }

    return {
        isLoading,
        filterDeleted,
        deleteRelations
    }
}