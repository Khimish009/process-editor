export type Position = {
    x: number
    y: number
}

export type Rectange = {
    leftTop: Position,
    rigthBottom: Position
}

export const createRectange = (position1: Position, position2: Position) => {
    const leftTopX = Map.min(position1.x, position2.x)
}

export const sumPosition = (p1: Position, p2: Position) => {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    }
}