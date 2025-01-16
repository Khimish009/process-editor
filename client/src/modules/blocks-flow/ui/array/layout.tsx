import { Block, Relation } from "../../domain/block";
import { getPortId } from "../../domain/port";
import { Position, sumPosition } from "../../domain/position";

export const Layout = ({ 
	blocks,
	relation,
	portPositions
}: { 
	blocks: Block[]
	relation: Relation
	portPositions: Record<string, Position>
}) => {
    const blocksRecord = blocks.reduce<Record<string, Block | undefined>>(
      (acc, block) => {
        acc[block.id] = block;
        return acc;
      },
      {}
    );
  
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
  
    return <path d={d} fill="none" stroke="black" />
}
