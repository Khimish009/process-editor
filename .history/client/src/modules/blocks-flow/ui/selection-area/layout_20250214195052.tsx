import type { Rectangle } from "../../domain/position";
import styles from "./styles.module.css"

export const Layout = ({ 
	rectangle
}: {
  rectangle: Rectangle
}) => {  
    return (
      <div 
        className={styles.selectionArea} 
        style={{
          left: rectangle.leftTop.x,
          top: rectangle.leftTop.y,
          width: rectangle.rightBottom - rectangle.leftTop
        }}
      />
    )
}
