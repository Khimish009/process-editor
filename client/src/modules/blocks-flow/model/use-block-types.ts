import { useEffect, useState } from "react"
import { BlocksFlowApi } from "../api"
import type { BlockTypes, BlockTypesRecord } from "./types/block-types"

export const useBlockTypes = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [blockTypes, setBlockTypes] = useState<BlockTypes[]>([])

    const fetchBlockTypes = () => {
        return BlocksFlowApi.getBlocksTypes().then(setBlockTypes)
    }

    useEffect(() => {
        setIsLoading(true)

        fetchBlockTypes().finally(() => setIsLoading(false))
    }, [])

    const blockTypesRecord = blockTypes.reduce((acc, blockType) => {
        acc[blockType.type] = blockType

        return acc
    }, {} as BlockTypesRecord)

    return {
        isLoading,
        data: blockTypesRecord,
        refetch: fetchBlockTypes
    }
}