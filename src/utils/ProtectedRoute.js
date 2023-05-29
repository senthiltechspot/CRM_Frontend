import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import constants from "../utils/constants";
import { alertContext } from "../context/AlertContext";

const ProtectedRoute = ({ children }) => {
  const [, setOpenAlert, , setMessage, , setAlertType] =
    useContext(alertContext);

  const location = useLocation();
  const userType = localStorage.getItem("userType");

  if (!userType) {
    return <Navigate to="/" replace />;
  }

  const page = location.pathname.split("/")[1];

  var requiredUserType = null;

  if (page === "admin") {
    requiredUserType = constants.userTypes.admin;
  } else if (page === "customer") {
    requiredUserType = constants.userTypes.customer;
  } else if (page === "engineer") {
    requiredUserType = constants.userTypes.engineer;
  }

  if (userType !== requiredUserType) {
    setAlertType("info");
    setMessage(
      `Sorry!, You are Not Authorized To Access the ${page.toLocaleUpperCase()} Page`
    );
    setOpenAlert(true);
    return (
      <>
        <Navigate to={`/${userType.toLocaleLowerCase()}`} replace />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
