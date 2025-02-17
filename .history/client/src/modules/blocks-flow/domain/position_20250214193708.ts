export type Position = {
    x: number
    y: number
}

export type Rectange = {
    leftTop: Position,
    rigthBottom: Position
}



export const sumPosition = (p1: Position, p2: Position) => {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    }
}