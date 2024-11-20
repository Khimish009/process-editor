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