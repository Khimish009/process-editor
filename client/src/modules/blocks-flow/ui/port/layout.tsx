import { useCallback } from "react"
import styles from "./styles.module.css"
import clsx from "clsx"
import type { Position } from "../../domain/position"

export const Layout = ({
    text,
    type,
    id,
    isSelected,
    isCanEndSelection,
    onTargetClick,
    onTargetPosition
}: { 
    text: string
    type: "input" | "output"
    id: string,
    isSelected: boolean
    isCanEndSelection?: boolean
    onTargetClick: () => void
    onTargetPosition?: (portId: string, position?: Position) => void
}) => {
    const callbackRef = useCallback((ref: HTMLButtonElement | null) => {
        if (ref) {
            onTargetPosition?.(id, {
                x: ref.offsetLeft + ref.clientWidth / 2,
                y: ref.offsetHeight + ref.clientHeight / 2,
            })
        } else {
            onTargetPosition?.(id)
        }
    }, [id])

    return (
        <div className={clsx(styles.port, styles[type], {
            [styles.selected]: isSelected,
            [styles.canEndSelection]: isCanEndSelection,
        })}>
            <div className={styles.label}>{text}</div>
            <button
                ref={callbackRef}
                onClick={onTargetClick} 
                className={styles.target}
            />
        </div>
    )
}