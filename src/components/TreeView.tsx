import { Typography } from "@mui/material";
import React from "react";
import Tree from "react-d3-tree";

interface TreeViewProps {
  data: any;
}

const TreeView: React.FC<TreeViewProps> = ({ data }: { data: any }) => {
  const containerStyles = {
    width: "100%",
    height: "800px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }) => (
    <g>
      {/* Node circle */}
      <circle r={10} onClick={toggleNode} />

      {/* Node name */}
      <text>{nodeDatum.name}</text>

      {/* Scrollable attributes */}
      {nodeDatum.attributes && (
        <foreignObject x={20} y={20} width={150} height={200}>
          <Typography
            sx={{
              overflow: "auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px",
              margin: "10px",
              fontSize: "12px",
            }}
          >
            {Object.entries(nodeDatum.attributes).map(([key, value]) => (
              <>{`${key}: ${value}`}</>
            ))}
          </Typography>
        </foreignObject>
      )}
    </g>
  );

  return (
    <div style={containerStyles}>
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode}
      />
    </div>
  );
};

export default TreeView;
