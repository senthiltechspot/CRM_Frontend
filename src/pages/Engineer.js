import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TicketTables from "../components/TicketTables";

function Engineer() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    if (userType === "CUSTOMER") {
      navigate("/customer");
    } else if (userType === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate, userType]);

  return (
    <>
      {" "}
      Engineer Dashboard
      {/* <TicketTables /> */}
    </>
  );
}

export default Engineer;
