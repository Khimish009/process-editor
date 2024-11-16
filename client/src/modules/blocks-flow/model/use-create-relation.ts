import { useState } from "react"
import { BlocksFlowApi } from "../api"
import type { PortInfo } from "./types/port" 
import type { Block } from "./types/block"

export const useCreateRelation = (blocks: Block[], onRelationCreated?: () => void) => {
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
        const block = blocks.find(b => b.id === port.blockId)

        if (block) {
            if (
                port.type  === "input" && 
                block.inputs.some(input => input.inputPort === port.port)
            ) {
                return false
            }

            if (
                port.type === "output" && 
                block.outputs.some(output => output.outputPort === port.port)
            ) {
                return false
            }
        }

        return !getIsSelectedPort(port)
    }

    const getIsCanSelectedEnd = (port: PortInfo) => {
        return isSelecting && getIsCanSelectedPort(port) && selectedPort.port !== port.port
    }

    const selectPort = (currentPort: PortInfo) => {
        if (!getIsCanSelectedPort(currentPort)) {
            return
        }

        if (!selectedPort) {
            setSelectedPort(currentPort)
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
            }).then(() => {
                setSelectedPort(undefined)
                onRelationCreated?.()
            })
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
            }).then(() => {
                setSelectedPort(undefined)
                onRelationCreated?. ()
            }) 
        }
    }

    const unselectPort = () => {
        setSelectedPort(undefined)
    }

    return {
        isSelecting,
        getIsSelected: getIsSelectedPort,
        getIsCanSelectedEnd,
        selectPort,
        unselectPort
    }
}