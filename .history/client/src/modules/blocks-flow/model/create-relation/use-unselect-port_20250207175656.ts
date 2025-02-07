import { useSelectedPortStore } from "./use-selected-port-store"

export const useUnselectPort = () => {
    const { unselectPorts, selectedPort } = useSelectedPortStore()

    return {
        isSelection: !!selectedPort,
        unselectPorts
    }
}