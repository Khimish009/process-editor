import { useEffect, useRef } from "react"

export const useKeysHandlers = ({
    onDelete,
}: {
    onDelete?: () => void
}) => {
    const onDeleteRef = useRef(onDelete) 
    onDeleteRef.current = onDelete

    const handler = (e: KeyboardEvent) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault()
            onDeleteRef.current?.()
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handler)

        return () => window.removeEventListener("keydown", handler)
    }, [])
}