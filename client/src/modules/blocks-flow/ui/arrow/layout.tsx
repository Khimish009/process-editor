import { Block, BlockId, Relation } from "../../domain/block";
import { getPortId, PortId } from "../../domain/port";
import { Position, sumPosition } from "../../domain/position";
import styles from "./styles.module.css"

export const Layout = ({ 
	blocksRecord,
	relation, 
	portPositions,
  isSelected,
  onClick,
}: {
	blocksRecord: Record<BlockId, Block>
	relation: Relation
	portPositions: Record<PortId, Position>
  isSelected: boolean
  onClick: () => void
}) => {  
        const inputPortId = getPortId({
          blockId: relation.inputId,
          port: relation.inputPort,
          type: "input",
        });
  
        const outputPortId = getPortId({
          blockId: relation.outputId,
          port: relation.outputPort,
          type: "output",
        });
  
        const inputPortPosition = portPositions?.[inputPortId];
        const outputPortPosition = portPositions?.[outputPortId];
        const inputBlock = blocksRecord[relation.inputId];
        const outputBlock = blocksRecord[relation.outputId];
  
        if (
          !inputPortPosition ||
          !outputPortPosition ||
          !inputBlock ||
          !outputBlock
        ) {
          return null;
        }
  
        const inputPosition = sumPosition(inputBlock, inputPortPosition);
        const outputPosition = sumPosition(outputBlock, outputPortPosition);
  
    const d = `M ${inputPosition.x} ${inputPosition.y} L ${outputPosition.x} ${outputPosition.y}`;
  
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
