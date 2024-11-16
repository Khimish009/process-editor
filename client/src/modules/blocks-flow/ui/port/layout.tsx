import styles from "./styles.module.css"
import clsx from "clsx"

export const Layout = ({
    text,
    type,
    isSelected,
    isCanSelected,
    onTargetClick
}: { 
    text: string
    type: "input" | "output"
    isSelected: boolean
    isCanSelected: boolean
    onTargetClick: () => void
}) => {
    return (
        <div className={clsx(styles.port, styles[type], {
            [styles.selected]: isSelected,
            [styles.otherSelected]: isCanSelected,
        })}>
            <div className={styles.label}>{text}</div>
            <button 
                onClick={onTargetClick} 
                className={styles.target}
            />
        </div>
    )
}