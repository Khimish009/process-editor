import { Ref } from "react"
import styles from "./styles.module.css"
import clsx from "clsx"

export const Layout = ({
    text,
    type,
    isSelected,
    isCanEndSelection,
    onTargetClick,
    portRef,
}: { 
    text: string
    type: "input" | "output"
    isSelected: boolean
    isCanEndSelection?: boolean
    onTargetClick: () => void
    portRef: Ref<HTMLButtonElement>
}) => {


    return (
        <div className={clsx(styles.port, styles[type], {
            [styles.selected]: isSelected,
            [styles.canEndSelection]: isCanEndSelection,
        })}>
            <div className={styles.label}>{text}</div>
            <button
                ref={portRef}
                onClick={onTargetClick} 
                className={styles.target}
            />
        </div>
    )
}