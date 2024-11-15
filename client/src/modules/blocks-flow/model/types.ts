export type PortConfig = {
    port: string
    label: string
}

export type BlockTypes = {
    type: string
    label: string
    outputs: PortConfig
    inputs: PortConfig
}

export type Block = {
    id: string
    name: string
    type: string
    data: string

    x: number
    y: number

    inputs: Dependency[]
    outputs: Dependency[]
}

export type Dependency = {
    id: string
    outputId: string
    outputPort: string
    inputId: string
    inputPort: string
}

export type FlowPosition = {
    x: number
    y: number
}