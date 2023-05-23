import Sidebar from "../components/Sidebar";
import TicketTables from "../components/TicketTables";
import StatusDashBoard from "../components/StatusDashboard/StatusDashBoard";
import useFetchTickets from "../hooks/useFetchTickets";
import { createTicketsCount } from "../handlers/createTicketsCount";
import { Skeleton } from "@mui/material";

function Engineer() {
  const [ticketDetails, fetchTickets] = useFetchTickets();
  const statsData = createTicketsCount(ticketDetails);

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
          {ticketDetails.length > 0 ? (
            <TicketTables
              ticketDetails={ticketDetails}
              fetchTickets={fetchTickets}
            />
          ) : (
            <Skeleton variant="rounded" width={"100%"} height={"60vh"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Engineer;
