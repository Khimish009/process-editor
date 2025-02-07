import { blocksFlowApi } from "../../api"
import { relationFromPorts, type Block } from "../../domain/block"
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

    const isSelectedPort = selectedPort && portsAreEqual(port, selectedPort)

    const isCanStartSelection = !selectedPort && !portIsAlreadyInUse(blocks, port)

    const isCanEndSelection = selectedPort && !portIsAlreadyInUse(blocks, port) && !isPortTypesSame(selectedPort, port)


    const selectPort = async () => {
        if (isCanStartSelection) {
            setSelectedPort(port) 
            return
        }

        if (isCanEndSelection) {
            setSelectedEndPort(port)

            const params = relationFromPorts(port, selectedPort)
            unselectPorts()
            await blocksFlowApi.addRelation(params)
            await onSuccess?.()
        }
    }

    return {
        isSelectedPort,
        isCanEndSelection,
        selectPort
    }
}