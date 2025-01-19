import { useState } from "react"
import { blocksFlowApi } from "../api"
import { RelationId } from "../domain/block"

export const useDeleteRelation = ({
    getRelationsToDelete,
    onComplete,
    afterComplete
}: {
    getRelationsToDelete: () => RelationId[]
    onComplete: () => Promise<void>
    afterComplete: () => void
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const deleteRelations = async () => {
        setIsLoading(true)
        const ids = getRelationsToDelete()
        await Promise.allSettled(ids.map(id => blocksFlowApi.deleteRelation(id)))
        await onComplete()

        setIsLoading(false)
        afterComplete()
    }

    return {
        isLoading,
        deleteRelations
    }
}