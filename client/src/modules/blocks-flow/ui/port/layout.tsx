import styles from "./styles.module.css"
import clsx from "clsx"

export const Layout = ({
    text,
    type
}: {
    text: string
    type: "input" | "output"
}) => {
    return (
        <div className={clsx(styles.port, styles[type])}>
            <div className={styles.label}>{text}</div>
            <div className={styles.target}></div>
        </div>
    )
}