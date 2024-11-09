import styles from "./styles.module.css"

export const Layout = ({ 
    value, 
    onChangeValue 
}: { 
    value: string
    onChangeValue: (name: string) => void 
}) => {

    return (
        <div className={styles.root}>
            <input 
                className={styles.input}
                name="name"
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                type="text"
                placeholder="process name filter"
                aria-label="Filter by process name"
                required
            />
        </div>
    )
}