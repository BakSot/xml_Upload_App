import React from "react";
import Tree from "react-d3-tree";

interface TreeViewProps {
  data: any;
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const containerStyles = {
    width: "2400px",
    height: "500px",
  };

  return (
    <div style={containerStyles}>
      <Tree data={data} orientation="vertical" />
    </div>
  );
};

export default TreeView;
