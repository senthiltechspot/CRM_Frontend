import Sidebar from "../components/Sidebar";
import TicketTables from "../components/TicketTables";
import StatusDashBoard from "../components/StatusDashboard/StatusDashBoard";
import useFetchTickets from "../hooks/useFetchTickets";
import { createTicketsCount } from "../handlers/createTicketsCount";
import { Skeleton } from "@mui/material";
import TicketCreationModal from "../components/TicketCreationModal";
import useCreateTicket from "../hooks/useCreateTicket";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Customer() {
  const location = useLocation();
  const [ticketDetails, fetchTickets] = useFetchTickets();
  const statsData = createTicketsCount(ticketDetails);
  const { createTicketModal, openCreateTicketModal, closeCreateTicketModal } =
    useCreateTicket();

  useEffect(() => {
    const path = location.pathname;

    const isCreateTicketTrue = path.split("/")[2] === "createTicket";
    if (isCreateTicketTrue) {
      openCreateTicketModal();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="row "
      style={{
        backgroundImage: `url(" https://source.unsplash.com/random/?Animals+Art+Textures+Landscape&1")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
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
          <input
            className="bg-primary border-white text-white"
            style={{ width: "100%" }}
            onClick={openCreateTicketModal}
            type="submit"
            value="RAISE TICKET"
          />
        </div>

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
        <TicketCreationModal
          show={createTicketModal}
          onClose={closeCreateTicketModal}
          fetchTickets={fetchTickets}
        />
      </div>
    </div>
  );
}

export default Customer;
