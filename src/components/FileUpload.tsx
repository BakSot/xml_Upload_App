import React from "react";
import parseXmlToTreeData from "../utils/xmlParser";

interface FileUploadProps {
  onFileUpload: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(
          reader.result as string,
          "application/xml"
        );
        const treeData = parseXmlToTreeData(xmlDoc.documentElement);
        onFileUpload(treeData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" accept=".xml" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
