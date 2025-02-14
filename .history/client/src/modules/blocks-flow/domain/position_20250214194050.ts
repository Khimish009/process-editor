export type Position = {
    x: number
    y: number
}

export type Rectangle = {
    leftTop: Position,
    rigthBottom: Position
}

export const createRectangle = (position1: Position, position2: Position) => {
    const leftTopX = Math.min(position1.x, position2.x)
    const leftTopY = Math.min(position1.y, position2.y)
    const rigthBottomX = Math.max(position1.x, position2.x)
    const rigthBottomY = Math.max(position1.y, position2.y)

    return {
        leftTop: { x: leftTopX, y: leftTopY },
        rigthBottom: { x: rigthBottomX, y: rigthBottomY }
    }
}

export const sumPosition = (p1: Position, p2: Position) => {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    }
}