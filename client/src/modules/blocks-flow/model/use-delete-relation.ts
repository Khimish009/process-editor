import { useState } from "react"
import { blocksFlowApi } from "../api"
import { RelationId } from "../domain/block"

export const useDeleteRelation = ({
    getRelationsToDelete,
    onComplete
}: {
    getRelationsToDelete: () => RelationId[]
    onComplete: Array<() => void>
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const deleteRelations = async () => {
        setIsLoading(true)
        const ids = getRelationsToDelete()
        await Promise.allSettled(ids.map(id => blocksFlowApi.deleteRelation(id)))

        onComplete.forEach(onComplete => onComplete())
        setIsLoading(false)
    }

    return {
        isLoading,
        deleteRelations
    }
}