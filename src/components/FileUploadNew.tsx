// import {
//   Box,
//   CircularProgress,
//   Grid2,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import { FileTypesEnum } from "../utils/helpers";
// import useFileDropzone from "./useFileDropzone";
// import { useState } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ReactMarkdown from "react-markdown";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useDispatch } from "react-redux";
// import parseXmlToTreeData from "../utils/xmlParser";

// interface FileUploadProps {
//   //   setFile: (files: Blob, name?: string) => void;
//   //   clearFile?: () => void;
//   uploadFilePlaceholder: string;
//   definitionOfFormat: string;
//   allowedFileTypes: FileTypesEnum;
//   maxFiles: number;
//   //   loading?: boolean;
//   documentName?: string;
//   fileType?: FileTypesEnum;
//   onFileUpload: (data: any) => void;
// }

// const FileUploadNew: React.FC<FileUploadProps> = ({
//   //   setFile,
//   //   clearFile,
//   uploadFilePlaceholder,
//   definitionOfFormat,
//   allowedFileTypes = FileTypesEnum.XML,
//   maxFiles = 1,
//   //   loading,
//   documentName,
//   fileType,
//   onFileUpload,
// }) => {
//   const dispatch = useDispatch();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const { getRootProps, getInputProps, isDragAccept, fileRejections } =
//     useFileDropzone({
//       //   setFile,
//       allowedFileTypes,
//       maxFiles,
//     });

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(
//           reader.result as string,
//           "application/xml"
//         );
//         const treeData = parseXmlToTreeData(xmlDoc.documentElement);
//         onFileUpload(treeData);
//       };
//       reader.readAsText(file);
//     }
//   };
//   return (
//     <Grid2>
//       <div {...getRootProps()}>
//         <input
//           id="upload-file-input"
//           disabled={false}
//           {...getInputProps()}
//           onChange={handleFileChange}
//         />
//         lala
//         {/* {clearFile && ( */}
//         <Box>
//           <IconButton
//             onClick={() => setIsDialogOpen(true)}
//             aria-label="Clear-file"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//         {/* )} */}
//         <div>
//           {false ? (
//             <CircularProgress size={15} />
//           ) : documentName ? (
//             fileType !== undefined ? (
//               <Grid2 container>
//                 <Grid2>
//                   <Typography variant="body2">{documentName}</Typography>
//                 </Grid2>
//               </Grid2>
//             ) : (
//               <Typography variant="body2">{documentName}</Typography>
//             )
//           ) : (
//             <Grid2 container justifyContent={"center"}>
//               <Grid2>
//                 <Typography variant="body2" component={ReactMarkdown}>
//                   {uploadFilePlaceholder}
//                 </Typography>
//               </Grid2>
//               <Grid2>
//                 <CloudUploadIcon />
//               </Grid2>
//               {!documentName && definitionOfFormat && (
//                 <Grid2>
//                   <Typography>{definitionOfFormat}</Typography>
//                 </Grid2>
//               )}
//             </Grid2>
//           )}
//         </div>
//       </div>
//     </Grid2>
//   );
// };

// export default FileUploadNew;

import { useDropzone } from "react-dropzone";
import parseXmlToTreeData from "../utils/xmlParser";
import { useCallback } from "react";

interface FileUploadProps {
  onFileUpload: (data: any) => void;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; // Handle the first file (single-file support)
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
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".xml", // Restrict to XML files
    multiple: false, // Only allow single file uploads
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed gray",
        borderRadius: "5px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <p>Drag and drop an XML file here, or click to select one</p>
      )}
    </div>
  );
};

export default FileUploadComponent;
