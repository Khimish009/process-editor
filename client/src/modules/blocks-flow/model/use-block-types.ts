import { create } from "zustand";
import { blocksFlowApi } from "../api";
import {
  BlockTypes,
  BlockTypesRecord,
  getBlockTypesRecord,
} from "../domain/block-types";

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
