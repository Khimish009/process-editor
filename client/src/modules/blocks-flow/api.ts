import { BlockTypes } from "./model/types"

async function getBlocksTypes() {
    return await fetch("/api/block/types").then(res => res.json() as Promise<BlockTypes[]>)
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

async function deleteRelation(relationId: string) {
    return fetch(`/api/block/relation/${relationId}`, {
        method: "DELETE"
    })
}

export const BlocksFlowApi = {
    getBlocksTypes,
    addRelation,
    deleteRelation
}
