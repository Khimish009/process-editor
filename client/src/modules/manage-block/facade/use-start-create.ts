import { useCreateBlock } from "../model/useCreateBlock"

export const useStartCreate = () => {
    return useCreateBlock(state => state.startCreate)
}