import React, { useState } from "react"
import styles from "./styles.module.css"
import { BlockTypes, type FormData } from "../../model/types"
import { WebhookFields } from "../webhook-fields"

export const Layout = ({
    formId,
    onSubmit 
}: {
    formId: string
    onSubmit: (formData: FormData) => void 
}) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        type: BlockTypes.Start,
        data: "{}"
    })

    const handleTypeChange = (type: string) => {
        setFormData((formData) => ({...formData, type, name: type, data: "{}"}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form className={styles.root} onSubmit={handleSubmit} id={formId}>
            <select 
                className={styles.input}
                name="type"
                required
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value)}
            >
                {Object.values(BlockTypes).map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <input 
                className={styles.input}
                name="name"
                type="text"
                placeholder=""
                required
                value={formData.name}
                onChange={(e) => setFormData((formData) => ({...formData, name: e.target.value}))}
            />
            {formData.type === BlockTypes.Webhook  && (
                <WebhookFields 
                    data={formData.data}
                    onChangeData={(data) => setFormData({ ...formData, data })}
                />
            )}
        </form>
    )
}