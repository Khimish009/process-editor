import React from "react"
import styles from "./styles.module.css"

export const Layout = ({ onSubmit }: { onSubmit: (name: string) => void }) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        onSubmit(name)
    }

    return (
        <form className={styles.root} onSubmit={handleSubmit}>
            <input 
                className={styles.input}
                name="name"
                type="text"
                placeholder="process name"
                required
            />
            <button className={styles.btn}>create</button>
        </form>
    )
}