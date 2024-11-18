import { useState } from "react"
import { BlocksFlowApi } from "../api"
import type { Block } from "../domain/types/block"
import { isPortTypeSame, portIsAlreadyInUse, portsAreEqual, type Port } from "../domain/ports"

export const useCreateRelation = (blocks: Block[], onRelationCreated?: () => void) => {
    const [selectedPort, setSelectedPort] = useState<Port>()

    const isSelecting = !!selectedPort

    const getIsSelectedPort = (port: Port) => {
        return isSelecting && !portsAreEqual(port, selectedPort)
    }

    const getIsCanStartSelection = (port: Port) => !selectedPort && !portIsAlreadyInUse(blocks, port)

    const getIsCanEndSelection = (port: Port) => {
        return (
            selectedPort &&
            !portIsAlreadyInUse(blocks, port) && 
            !isPortTypeSame(selectedPort, port) &&
            !portsAreEqual(selectedPort, port)
        )
    }

    const selectPort = (port: Port) => {
        if (getIsCanStartSelection(port)) {
            setSelectedPort(port) 
            return
        }

        if (getIsCanEndSelection(port)) {
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

            return  BlocksFlowApi.addRelation(params).then(() => {
                setSelectedPort(undefined)
                onRelationCreated?.()
            })
        }

    }

    const unselectPort = () => {
        setSelectedPort(undefined)
    }

    return {
        selectPort,
        unselectPort,
        getIsSelectedPort,
        getIsCanEndSelection
    }
}