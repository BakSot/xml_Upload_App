import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import parseXmlToTreeData from "../utils/xmlParser";
import { Container } from "@mui/material";
import { FileUploadDiv } from "../styled";
import { TreeData } from "../App";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// Define FileUploadProps interface to type the expected prop 'onFileUpload'
interface FileUploadProps {
  onFileUpload: (data: TreeData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  // State to hold the uploaded file's name
  const [fileName, setFileName] = useState<string>("");

  // onDrop callback to handle file drops
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; // Handle the first file (single-file support)

      if (file) {
        // Create a new FileReader instance to read the file
        const reader = new FileReader();
        reader.onload = () => {
          // Create a new DOMParser instance to parse XML
          const parser = new DOMParser();
          // Parse the file content into an XML document
          const xmlDoc = parser.parseFromString(
            reader.result as string,
            "application/xml"
          );
          // Parse the XML document into tree data format
          const treeData = parseXmlToTreeData(xmlDoc.documentElement);
          // Call onFileUpload prop with the parsed tree data
          onFileUpload(treeData);
        };
        // Read the file as text
        reader.readAsText(file);
        // Set the file name in the state
        setFileName(file.name);
      }
    },
    // onFileUpload dependency to ensure the callback stays up-to-date
    [onFileUpload]
  );

  // Use the useDropzone hook to manage the drag-and-drop file upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, // Specify the onDrop callback
    accept: { "text/xml": [".xml"] }, // Restrict to XML files
    multiple: false, // Only allow single file uploads
  });

  return (
    <Container>
      <FileUploadDiv {...getRootProps()}>
        <input {...getInputProps()} aria-label={"file upload"} />
        {/* Show drag-and-drop text when file is being dragged  */}
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : fileName ? (
          // If a file has been selected, display its name with an icon
          <p>
            <InsertDriveFileIcon />
            {fileName}
          </p>
        ) : (
          // Default message when no file is selected
          <p>Drag and drop an XML file here, or click to select one</p>
        )}
      </FileUploadDiv>
    </Container>
  );
};

export default FileUpload;
