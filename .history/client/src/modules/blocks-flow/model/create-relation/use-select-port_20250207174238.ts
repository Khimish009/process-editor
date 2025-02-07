export const useSelectPort = ({
    port,
    blocks,
    onSuccess
}: {
    port: Port, 
    blocks: Block[], 
    onSuccess?: () => Promise<void>
}) => {
    const { selectedPort, setSelectedPort, unselectPort } = useSelectedPortStore()

    const isSelectedPort = !!selectedPort && portsAreEqual(port, selectedPort)

    const isCanStartSelection = !selectedPort && !portIsAlreadyInUse(blocks, port)

    const isCanEndSelection = selectedPort && !portIsAlreadyInUse(blocks, port) && !isPortTypesSame(selectedPort, port)


    const selectPort = () => {
        if (isCanStartSelection) {
            setSelectedPort(port) 
            return
        }

        if (isCanEndSelection) {
            const params = port.type === "input" ?
            {
                inputId: port!.blockId,
                inputPort: port!.port,
                outputId: selectedPort!.blockId,
                outputPort: selectedPort!.port
            } :
            {
                inputId: selectedPort!.blockId,
                inputPort: selectedPort!.port,
                outputId: port!.blockId,
                outputPort: port!.port
            }

            return blocksFlowApi.addRelation(params).then(() => {
                unselectPort()
                onSuccess?.()
            })
        }
    }

    return {
        isSelectedPort,
        isCanEndSelection,
        selectPort
    }
}