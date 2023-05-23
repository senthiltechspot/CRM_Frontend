import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const BackDrop = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.openBackDrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
