import React, { useState } from "react";
import FileUploadNew from "./components/FileUploadNew";
import TreeView from "./components/TreeView";
import { FileTypesEnum } from "./utils/helpers";
import { Button } from "@mui/material";
import parseXmlToTreeData from "./utils/xmlParser";
import FileUpload from "./components/FileUpload";

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<any>(null);

  const handleFileUpload = (parsedData: any) => {
    setTreeData(parsedData);
  };

  // const diagramHandler = () => {
  //   if (file) {
  //     console.log("entered");
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(
  //         reader.result as string,
  //         "application/xml"
  //       );
  //       const treeData = parseXmlToTreeData(xmlDoc.documentElement);
  //       handleFileUpload(treeData);
  //     };
  //     reader.readAsText(file);
  //   }
  // };

  return (
    <div>
      <h1>XML Tree Viewer</h1>
      {/* <FileUpload onFileUpload={handleFileUpload} /> */}
      <FileUploadNew
        // uploadFilePlaceholder="Drag your document here or click to to browse"
        // definitionOfFormat="XML, max 2 MB"
        // fileType={FileTypesEnum.XML}
        // allowedFileTypes={FileTypesEnum.XML}
        // maxFiles={1}
        onFileUpload={handleFileUpload}
      />
      {/*<Button>Cancel</Button>
      <Button onClick={diagramHandler}>Import</Button> */}
      {treeData && <TreeView data={treeData} />}
    </div>
  );
};

export default App;
