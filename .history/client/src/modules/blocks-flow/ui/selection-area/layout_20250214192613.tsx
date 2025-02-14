import { Position } from "../../domain/position";
import styles from "./styles.module.css"

export const Layout = ({ 
	start,
  end,
}: {
  start: Position
  end: Position
}) => {  
    return (
      <div className={styles.selectionArea}></div>
    )
}
