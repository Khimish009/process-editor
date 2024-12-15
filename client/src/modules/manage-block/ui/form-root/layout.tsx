import React from "react"
import styles from "./styles.module.css"

export const Layout = ({
    formId,
    onSubmit,
	children,
}: {
    formId: string
    onSubmit: React.FormEventHandler<HTMLFormElement>,
	children?: React.ReactNode,
}) => {
	return (
        <form 
			className={styles.root} 
			onSubmit={onSubmit} 
			id={formId}
		>
			{children}
		</form>
    )
}
