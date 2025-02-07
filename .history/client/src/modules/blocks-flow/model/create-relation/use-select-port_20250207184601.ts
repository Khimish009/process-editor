import { blocksFlowApi } from "../../api"
import { relationFromPorts, type Block } from "../../domain/block"
import { isPortBlocksSame, isPortTypesSame, portIsAlreadyInUse, portsAreEqual, type Port } from "../../domain/port"
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

    const isCanEndSelection = 
        selectedPort && 
        !portIsAlreadyInUse(blocks, port) && 
        !isPortTypesSame(selectedPort, port) && 
        !isPortBlocksSame(selectedPort, port)


    const selectPort = async () => {
        if (isCanStartSelection) {
            setSelectedPort(port) 
            return
        }

        if (isCanEndSelection) {
            setSelectedEndPort(port)

            const params = relationFromPorts(port, selectedPort)
            await blocksFlowApi.addRelation(params)
            await onSuccess?.()

            unselectPorts()
        }
    }

    return {
        isSelectedPort,
        isCanEndSelection,
        selectPort
    }
}