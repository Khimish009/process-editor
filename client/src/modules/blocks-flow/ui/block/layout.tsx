import styles from "./styles.module.css"
import { Block } from "../../model/types"

export const Layout = ({
    block,
}: {
    block: Block
}) => {
    return (
        <div className={styles.block} style={{ left: block.x, top: block.y }}>
            {block.name}
        </div>
    )
}