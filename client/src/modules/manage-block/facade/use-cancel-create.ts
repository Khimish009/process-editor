import { useCreateBlock } from "../model/useCreateBlock"

export const useCancelCreate = () => {
    return useCreateBlock(state => state.cancelCreate)
}