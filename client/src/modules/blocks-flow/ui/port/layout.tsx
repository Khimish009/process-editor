import styles from "./styles.module.css"
import clsx from "clsx"

export const Layout = ({
    text,
    type,
    isSelected,
    isCanEndSelection,
    onTargetClick
}: { 
    text: string
    type: "input" | "output"
    isSelected: boolean
    isCanEndSelection?: boolean
    onTargetClick: () => void
}) => { 
    return (
        <div className={clsx(styles.port, styles[type], {
            [styles.selected]: isSelected,
            [styles.canEndSelection]: isCanEndSelection,
        })}>
            <div className={styles.label}>{text}</div>
            <button 
                onClick={onTargetClick} 
                className={styles.target}
            />
        </div>
    )
}