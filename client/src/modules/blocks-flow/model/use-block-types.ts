import { useEffect, useState } from "react"
import { BlocksFlowApi } from "../api"
import { BlockTypes } from "./types"

export const useBlockTypes = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [blockTypes, setBlockTypes] = useState<BlockTypes[]>()

    const fetchBlockTypes = () => {
        return BlocksFlowApi.getBlocksTypes().then(setBlockTypes)
    }

    useEffect(() => {
        setIsLoading(true)

        fetchBlockTypes().finally(() => setIsLoading(false))
    }, [])


    return {
        isLoading,
        blockTypes,
        refetch: fetchBlockTypes
    }
}