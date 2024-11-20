import styles from "./styles.module.css"

export const Layout = ({ arrowD }: { arrowD: string }) => {
    return (
        <svg className={styles.arrows}>
            <path d={arrowD} fill="none" stroke="black" />
        </svg>
    )
}