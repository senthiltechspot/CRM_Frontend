import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TicketTables from "../components/TicketTables";
import { useNavigate } from "react-router-dom";
import StatusDashBoard from "../components/StatusDashboard/StatusDashBoard";
import useFetchTickets from "../hooks/useFetchTickets";
import { createTicketsCount } from "../handlers/createTicketsCount";

function Engineer() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const [ticketDetails, fetchTickets] = useFetchTickets();
  const statsData = createTicketsCount(ticketDetails);

  useEffect(() => {
    if (userType === "ADMIN") {
      navigate("/admin");
    } else if (userType === "CUSTOMER") {
      navigate("/customer");
    }
  });

  return (
    <div className="row bg-light">
      <div className="col-1">
        <Sidebar />
      </div>
      <div className="col my-4">
        <StatusDashBoard
          ticketLength={ticketDetails.length}
          statsData={statsData}
        />

        <hr />
        <div className="container">
          <TicketTables
            ticketDetails={ticketDetails}
            fetchTickets={fetchTickets}
          />
        </div>
      </div>
    </div>
  );
}

export default Engineer;
