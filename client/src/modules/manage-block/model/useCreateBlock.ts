import { useState } from "react"
import { BlockPosition } from "../../../pages/process/model/types"
import { manageBlockApi } from "../api"

export type BlockData = {
    name: string
    type: string
    data: string
}

export const useCreateBlock = ({
    processId,
    blockPosition,
    onSuccess
}: {
    processId: string,
    blockPosition?: BlockPosition,
    onSuccess: () => void
}) => {
    const [isCreating, setIsCreating] = useState(false)

    const startCreate = (blockData: BlockData) => {
        if (!blockPosition) {
            return;
        }

        setIsCreating(true)

        manageBlockApi.createBlock({
            processId,
            ...blockData,
            ...blockPosition
        })
        .then(onSuccess)
        .finally(() => setIsCreating(false))
    }

    return {
        isCreating,
        startCreate
    }
}