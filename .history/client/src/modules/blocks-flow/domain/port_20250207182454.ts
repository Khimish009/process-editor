import type { Block, BlockId } from "./block"

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
    const params = portA.type === "input" ?
            {
                inputId: portA.blockId,
                inputPort: portA.port,
                outputId: portB.blockId,
                outputPort: portB.port
            } :
            {
                inputId: portB.blockId,
                inputPort: portB.port,
                outputId: portA.blockId,
                outputPort: portA.port
            }
}
