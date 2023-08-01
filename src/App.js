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

function App() {
  const [OpenAlert, setOpenAlert, Message, , AlertType, , openBackDrop, ,] =
    useContext(alertContext);
  return (
    <div>
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
            path="/customer/createTicket"
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
          <Route
            path="/admin/:username"
            element={
              <ProtectedRoute>
                {" "}
                <Admin />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
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
      <h6>
            © Designed and Developed by
            <a href="https://github.com/Senthilspot"> Senthilspot</a>
      </h6>
    </div>
  );
}

export default App;
