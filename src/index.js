import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-circular-progressbar/dist/styles.css";
import { createTheme, ThemeProvider } from "@mui/material";
import AlertDetailsProvider from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme();

root.render(
  <>
    <ThemeProvider theme={theme}>
      <AlertDetailsProvider>
        <App />
      </AlertDetailsProvider>
    </ThemeProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
