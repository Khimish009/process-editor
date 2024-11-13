import { BlockTypes } from "../../../model/types"
import { FormData } from "../../../view-model/use-create-form"
import styles from "./styles.module.css"

export const Layout = ({
    formData,
    handleNameChange,
    handleTypeChange,
}: {
    formData: FormData,
    handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}) => {

    return (
        <>
            <select 
                className={styles.input}
                name="type"
                required
                value={formData.type}
                onChange={handleTypeChange}
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
                onChange={handleNameChange}
            />
        </>
    )
}