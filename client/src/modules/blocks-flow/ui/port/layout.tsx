import styles from "./styles.module.css"
import clsx from "clsx"

export const Layout = ({
    text,
    type,
    isSelected,
    isOtherSelected,
    onTargetClick
}: { 
    text: string
    type: "input" | "output"
    isSelected: boolean
    isOtherSelected: boolean
    onTargetClick: () => void
}) => {
    return (
        <div className={clsx(styles.port, styles[type], {
            [styles.selected]: isSelected,
            [styles.otherSelected]: isOtherSelected,
        })}>
            <div className={styles.label}>{text}</div>
            <button 
                onClick={onTargetClick} 
                className={styles.target}
            />
        </div>
    )
}