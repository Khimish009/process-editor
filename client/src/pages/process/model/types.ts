export type Process = {
    id: string
    name: string
    blocks: Block[]
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

type Dependency = {
    id: string
    outputId: string
    outputPort: string
    inputId: string
    inputPort: string
}