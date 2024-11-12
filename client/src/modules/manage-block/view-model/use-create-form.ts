import React, { useState } from "react"
import { type BlockType, BlockTypes } from "../model/types"

export type FormData = {
    name: string
    type: BlockType
    data: string
} 

export const useFormCreate = (onSubmit: (formData: FormData) => void) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        type: BlockTypes.Start,
        data: "{}"
    })

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value
        setFormData((formData) => ({...formData, type, name: type, data: "{}"}))
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((formData) => ({...formData, name: e.target.value}))
    }

    const hanldleDataChange = (data: string) => {
        setFormData((formData) => ({ ...formData, data }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(formData)
    }


    return {
        formData,
        handleTypeChange,
        handleNameChange,
        hanldleDataChange,
        handleSubmit
    }
}