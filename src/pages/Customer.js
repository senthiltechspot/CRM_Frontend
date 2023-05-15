import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Customer() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    if (userType === "ENGINEER") {
      navigate("/engineer");
    } else if (userType === "ADMIN") {
      navigate("/admin");
    }
  }, []);
  return <h2> Customer Dashboard </h2>;
}

export default Customer;
