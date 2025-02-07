import { blocksFlowApi } from "../../api"
import type { Block } from "../../domain/block"
import { isPortTypesSame, portIsAlreadyInUse, portsAreEqual, type Port } from "../../domain/port"
import { useSelectedPortStore } from "./use-selected-port-store"

export const useSelectPort = ({
    port,
    blocks,
    onSuccess
}: {
    port: Port, 
    blocks: Block[], 
    onSuccess?: () => Promise<void>
}) => {
    const { 
        selectedPort, 
        setSelectedPort, 
        setSelectedEndPort,
        unselectPorts
    } = useSelectedPortStore()

    const isSelectedPort = !!selectedPort && portsAreEqual(port, selectedPort)

    const isCanStartSelection = !selectedPort && !portIsAlreadyInUse(blocks, port)

    const isCanEndSelection = selectedPort && !portIsAlreadyInUse(blocks, port) && !isPortTypesSame(selectedPort, port)


    const selectPort = () => {
        if (isCanStartSelection) {
            setSelectedPort(port) 
            return
        }

        if (isCanEndSelection) {
            setSelectedEndPort(port)

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
                unselectPorts()
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