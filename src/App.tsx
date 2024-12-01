import React, { useState } from "react";
import FileUploadNew from "./components/FileUploadNew";
import TreeView from "./components/TreeView";
import { Button, Container } from "@mui/material";

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<{}>();
  const [showTree, setShowTree] = useState(false);

  const handleFileUpload = (parsedData: {}) => {
    setTreeData(parsedData);
  };

  const visualizeHandler = () => {
    treeData && setShowTree(true);
  };

  console.log("treeData", treeData);

  return (
    <Container>
      <h1>XML Tree Viewer</h1>
      <FileUploadNew onFileUpload={handleFileUpload} />
      <Button
        sx={{ margin: "20px" }}
        variant="outlined"
        onClick={visualizeHandler}
      >
        Visualize XML
      </Button>
      {treeData && showTree && <TreeView data={treeData} />}
    </Container>
  );
};

export default App;
