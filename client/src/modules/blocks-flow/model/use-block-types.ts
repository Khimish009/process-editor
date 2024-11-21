import { blocksFlowApi } from "../api"
import type { BlockTypes, BlockTypesRecord } from "../domain/block-types"
import { create } from "zustand"

type Store = {
    isLoading: boolean,
    blockTypes: BlockTypes[]
    getData: () => BlockTypesRecord
    refetch: () => void
}

export const useBlockTypes = create<Store>((set, get) => {
    const fetchBlockTypes = () => {
        blocksFlowApi.getBlocksTypes().then((blockTypes) => {
            set({
                blockTypes,
                isLoading: false
            })
        })
    }

    fetchBlockTypes()

    return {
        isLoading: true,
        blockTypes: [],
        getData: () => {
            return get().blockTypes.reduce((acc, blockType) => {
                acc[blockType.type] = blockType
        
                return acc
            }, {} as BlockTypesRecord)
        },
        refetch: fetchBlockTypes
    }
})
