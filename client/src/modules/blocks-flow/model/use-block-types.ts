import { blocksFlowApi } from "../api"
import { getBlockTypesRecord, type BlockTypes, type BlockTypesRecord } from "../domain/block-types"
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
        getData: () => getBlockTypesRecord(get().blockTypes),
        refetch: fetchBlockTypes
    }
})
