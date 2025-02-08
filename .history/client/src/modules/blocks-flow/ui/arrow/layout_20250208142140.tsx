import { Position } from "../../domain/position";
import styles from "./styles.module.css"

export const Layout = ({ 
	start,
  end,
  isSelected,
  onClick,
}: {
  isSelected: boolean
  start: Position
  end: Position
  onClick: () => void
}) => {  
    const d = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  
    return (
      <path 
        d={d}  
        fill="none" 
        onClick={onClick}
        className={styles.arrow}
        stroke={isSelected ? "blue" : "black"}
      />
    )
}
