import { Position, Rectangle } from "../../domain/position";
import styles from "./styles.module.css"

export const Layout = ({ 
	rectangle
}: {
  rectangle: Rectangle
}) => {  
    return (
      <div className={styles.selectionArea}></div>
    )
}
