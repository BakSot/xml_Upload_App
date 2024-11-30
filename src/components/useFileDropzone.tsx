import { useDropzone } from "react-dropzone";
import { fileTypeController, FileTypesEnum } from "../utils/helpers";
import { useDispatch } from "react-redux";

interface UseFileDropzoneProps {
  // setFile: (files: Blob, name: string) => void;
  documentName?: string;
  allowedFileTypes?: FileTypesEnum;
  maxFiles: number;
}

const useFileDropzone = ({
  // setFile,
  allowedFileTypes,
  maxFiles = 1,
}: UseFileDropzoneProps) => {
  const dispatch = useDispatch();

  const fileNameMaxCharLength = 20;

  const { getRootProps, getInputProps, isDragAccept, fileRejections } =
    useDropzone({
      maxFiles: maxFiles,
      getFilesFromEvent: async (event) => {
        if (event.type !== "change" && event.type !== "drop") {
          return [];
        }
        const file = (event as any).dataTransfer
          ? (event as any).dataTransfer.files
          : (event as any).target.files;

        const fileType = fileTypeController(file[0]?.name);
        const promises: Promise<File | DataTransferItem>[] = [];
        const promise = new Promise<File | DataTransferItem>((resolve) => {
          if (fileType === FileTypesEnum.XML) {
            resolve(file);
          }
        });

        promises.push(promise);

        return await Promise.all(promises);
      },

      // validator: (file: File) => {
      //   const fileType = fileTypeController(file.name);
      //   if (!allowedFileTypes?.includes(fileType as FileTypesEnum)) {
      //     return {
      //       code: "file-invalid-type",
      //       message: "The type of the file is not allowed",
      //     };
      //   }

      //   if (file?.name?.length > fileNameMaxCharLength) {
      //     const errorMessage = `The name of the file is too long. Maximum length allowed is ${fileNameMaxCharLength.toString()} characters and the actual length is ${file?.name.length.toString()}`;
      //     return { code: "file-name-too-long", message: errorMessage };
      //   }
      //   return null;
      // },
      onDrop: (files) => {
        if (files?.length > 0) {
          // setFile(files[0], files[0]?.name);
        }
      },
    });

  return { getRootProps, getInputProps, isDragAccept, fileRejections };
};

export default useFileDropzone;
