import React from "react";
import Tree, { RawNodeDatum, TreeNodeDatum } from "react-d3-tree";
import { StyledDiv, StyledTypography } from "../styled";

// Define the type for TreeViewProps, ensuring 'data' can be either a single RawNodeDatum or an array of RawNodeDatum.
export interface TreeViewProps {
  data: RawNodeDatum | RawNodeDatum[]; // Define the type for the data prop
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  // Define the custom rendering logic for tree nodes
  const renderCustomNode = ({
    nodeDatum, // Node data passed by react-d3-tree
    toggleNode, // Function to toggle the visibility of child nodes (expand/collapse)
  }: {
    nodeDatum: TreeNodeDatum; // Node data of type TreeNodeDatum
    toggleNode: () => void; // Toggle function to control node expansion
  }) => (
    <g>
      {/* Node circle */}
      <circle r={10} onClick={toggleNode} />

      {/* Node name */}
      <text>{nodeDatum.name}</text>

      {/* Scrollable attributes */}
      {nodeDatum.attributes && (
        <foreignObject x={20} y={20} width={150} height={200}>
          <StyledTypography tabIndex={0}>
            {Object.entries(nodeDatum.attributes).map(([key, value]) => (
              <span key={key}>{`${key}: ${value}`}</span>
            ))}
          </StyledTypography>
        </foreignObject>
      )}
    </g>
  );

  return (
    <StyledDiv>
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode}
      />
    </StyledDiv>
  );
};

export default TreeView;
