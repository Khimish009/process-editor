export type PortConfig = {
    port: string
    label: string
}

export type BlockTypes = {
    type: string
    label: string
    outputs: PortConfig[]
    inputs: PortConfig[]
}

export type BlockTypesRecord = Record<string, BlockTypes | undefined>

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
    inputId: string
    inputPort: string
    outputId: string
    outputPort: string
}

export type FlowPosition = {
    x: number
    y: number
}