export enum FileTypesEnum {
  XML = "XML",
}

export const fileTypeController = (fileName: string) => {
  let fileType: FileTypesEnum.XML | null = null;

  if (fileName?.endsWith(".xml")) {
    fileType = FileTypesEnum.XML;
  }
  return fileType;
};
