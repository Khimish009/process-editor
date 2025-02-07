export const useUnselectPort = () => {
    const { unselectPort, selectedPort } = useSelectedPortStore()

    return {
        isSelection: !!selectedPort,
        unselectPort
    }
}