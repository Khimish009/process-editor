import { useState } from "react"
import { BlocksFlowApi } from "../api"
import { PortInfo } from "./types/port"

export const useCreateRelation = () => {
    const [selectedPort, setSelectedPort] = useState<PortInfo>()

    const isSelecting = !!selectedPort

    const getIsSelectedPort = (port: PortInfo) => {
        return (
            port.blockId === selectedPort?.blockId &&
            port.type === selectedPort?.type &&
            port.port === selectedPort?.port
        )
    }

    const getIsCanSelectedPort = (port: PortInfo) => {
        return isSelecting && !getIsSelectedPort(port) && port.type !== selectedPort.type
    }

    const selectPort = (currentPort: PortInfo) => {
        if (!selectedPort) {
            setSelectedPort(currentPort)
            return
        }

        if (selectedPort.blockId === currentPort.blockId) {
            return
        }

        if (selectedPort.type === "input") {
            if (currentPort.type === "input") {
                return
            }

            BlocksFlowApi.addRelation({
                inputId: selectedPort.blockId,
                inputPort: selectedPort.port,
                outputId: currentPort.blockId,
                outputPort: currentPort.port
            }).then(() => setSelectedPort(undefined))
        }

        if (selectedPort.type === "output") {
            if (currentPort.type === "output") {
                return
            }

            BlocksFlowApi.addRelation({
                inputId: currentPort.blockId,
                inputPort: currentPort.port,
                outputId: selectedPort.blockId,
                outputPort: selectedPort.port
            }).then(() => setSelectedPort(undefined))
        }
    }

    const unselectPort = () => {
        setSelectedPort(undefined)
    }

    return {
        isSelecting,
        getIsSelected: getIsSelectedPort,
        getIsCanSelected: getIsCanSelectedPort,
        selectPort,
        unselectPort
    }
}