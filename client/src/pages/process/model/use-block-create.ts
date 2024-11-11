import { useState } from "react"
import { BlockPosition } from "./types"

export const useBlockCreate = () => {
    const [positionToCreate, setPositionToCreate] = useState<BlockPosition>()

    const startCreate = (position: BlockPosition) => setPositionToCreate(position)

    const stopCreate = () => setPositionToCreate(undefined)

    const isCreating = !!positionToCreate

    return {
        isCreating,
        startCreate,
        stopCreate
    }
}