import "./App.css";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Admin from "./pages/Admin";
import Engineer from "./pages/Engineer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import AlertSnackBar from "./components/AlertSnackBar";
import { alertContext } from "./context/AlertContext";
import { useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
// import AlertDetailsProvider from "./context/AlertContext";

function App() {
  const [
    OpenAlert,
    setOpenAlert,
    Message,
    ,
    AlertType,
    ,
    openBackDrop,
    ,
  ] = useContext(alertContext);
  return (
    <div>
      {/* <AlertDetailsProvider> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engineer"
            element={
              <ProtectedRoute>
                <Engineer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      {/* </AlertDetailsProvider> */}
      <AlertSnackBar
        Message={Message}
        AlertType={AlertType}
        OpenAlert={OpenAlert}
        setOpenAlert={setOpenAlert}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
