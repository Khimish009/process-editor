import { Block, BlockId } from "./block"

export type PortId = string

export type Port = {
    blockId: BlockId
    type: "input" | "output"
    port: string 
} 

export const portsAreEqual = (a?: Port, b?: Port) => {
    return (
        a?.blockId === b?.blockId &&
        a?.type === b?.type &&
        a?.port === b?.port
    )
}

export const portIsAlreadyInUse = (blocks: Block[], port: Port) => {
    const block = blocks.find(b => b.id === port.blockId)

    if (block) {
        if (
            port.type  === "input" && 
            block.inputs.some(input => input.inputPort === port.port)
        ) {
            return true
        }

        if (
            port.type === "output" && 
            block.outputs.some(output => output.outputPort === port.port)
        ) {
            return true
        }
    }
    
    return false
}

export const isPortTypesSame = (a?: Port, b?: Port) => a?.type === b?.type

export const getPortId = (port: Port): PortId => `${port.blockId}:${port.type}:${port.port}`

export const relationFromPort = (portA: Port, portB: Port) => {
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
}
