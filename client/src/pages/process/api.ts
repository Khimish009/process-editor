import { Process } from "./model/types"

async function getById(processId: string) {
    return fetch(`/api/processes/${processId}`)
        .then(res => res.json() as Promise<Process>)
}

type BlockParams = {
    processId: string
    name: string
    type: string
    data: string
    x: number
    y: number
}

async function createBlock(data: BlockParams) {
    return fetch('/api/block', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
    })
}

type RelationParams = {
    outputId: string
    outputPort: string
    inputId: string
    inputPort: string
}

async function addRelation(data: RelationParams) {
    return fetch('/api/block/relation', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data })
    })
}

export const api = {
    getById,
    createBlock,
    addRelation
}
