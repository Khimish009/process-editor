export type Block = {
    id: string
    name: string
    type: string
    data: string
}

export const BlockTypes = {
    Webhook: "webhook",
    Start: "start",
    End: "end"
}

export type BlockType = (typeof BlockTypes)[keyof typeof BlockTypes]

export type FormData = {
    name: string
    type: BlockType
    data: string
} 
