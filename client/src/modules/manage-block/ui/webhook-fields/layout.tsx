import styles from "./styles.module.css"

export const Layout = ({
    data,
    onChangeData
}: {
    data: string,
    onChangeData: (data: string) => void
}) => {
    const formData = JSON.parse(data)
    const setFormData = (key: string, value: string) => {
        onChangeData(JSON.stringify({...formData, [key]: value}))
    }

    return (
        <>
            <input 
                className={styles.input}
                name="url"
                type="text"
                value={formData.url}
                onChange={(e) => setFormData("url", e.target.value)}
            />
            <select 
                className={styles.input}
                name="method"
                value={formData.method}
                onChange={(e) => setFormData("method", e.target.value)}
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
            </select>
        </>
    )
}