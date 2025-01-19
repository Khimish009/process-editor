import { BlockId } from "./domain/block"
import { BlockTypes } from "./domain/block-types"

async function getBlocksTypes() {
    return await fetch("/api/blocks/types").then(res => res.json() as Promise<BlockTypes[]>)
}

type RelationParams = {
    outputId: string
    outputPort: string
    inputId: string
    inputPort: string
}

async function addRelation(data: RelationParams) {
    return fetch('/api/blocks/relation', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

async function deleteRelation(relationId: string) {
    return fetch(`/api/blocks/relation/${relationId}`, {
        method: "DELETE"
    })
}

async function deleteBlock(blockId: BlockId) {
    return fetch(`/api/blocks/${blockId}`, {
        method: "DELETE"
    })
}

export const blocksFlowApi = {
    getBlocksTypes,
    addRelation,
    deleteRelation,
    deleteBlock,
}
