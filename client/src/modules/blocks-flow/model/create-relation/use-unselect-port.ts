import { useSelectedPortStore } from "./use-selected-port-store"

export const useUnselectPort = () => {
    const { unselectPort, selectedPort } = useSelectedPortStore()

    return {
        isSelection: !!selectedPort,
        unselectPort
    }
}