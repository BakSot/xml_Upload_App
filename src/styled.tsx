import { Button, styled, Typography } from "@mui/material";

export const VisualizeBtn = styled(Button)({ margin: "20px" });

export const StyledDiv = styled("div")({
  width: "100%",
  height: "800px",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

export const StyledTypography = styled(Typography)({
  overflow: "auto",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "4px",
  margin: "10px",
  fontSize: "12px",
});

export const FileUploadDiv = styled("div")({
  border: "2px dashed gray",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
});

export const ErrorTypo = styled(Typography)({
  color: "red",
});
