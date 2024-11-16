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