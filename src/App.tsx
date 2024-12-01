import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import TreeView from "./components/TreeView";
import { Container } from "@mui/material";
import { VisualizeBtn } from "./styled";

export interface TreeData {
  name: string;
  attributes?: { [key: string]: string };
  children?: TreeData[];
  value?: string;
}

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeData | null>(null);
  const [showTree, setShowTree] = useState(false);

  const handleFileUpload = (parsedData: TreeData) => {
    setTreeData(parsedData);
  };

  const visualizeHandler = () => {
    treeData && setShowTree(true);
  };

  return (
    <Container>
      <h1>XML Tree Viewer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <VisualizeBtn variant="outlined" onClick={visualizeHandler}>
        Visualize XML
      </VisualizeBtn>
      {treeData && showTree && <TreeView data={treeData} />}
    </Container>
  );
};

export default App;
