import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TicketTables from "../components/TicketTables";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UsersTable";
import StatusDashBoard from "../components/StatusDashboard/StatusDashBoard";
import useFetchTickets from "../hooks/useFetchTickets";
import useFetchUsers from "../hooks/useFetchUsers";
import { createTicketsCount } from "../handlers/createTicketsCount";
// import useUpdateTicket from "../hooks/useUpdateTicket";
// import useUpdateUser from "../hooks/useUpdateUser";

function Admin() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const [ticketDetails, fetchTickets] = useFetchTickets();
  const [userDetails, fetchUsers] = useFetchUsers();
  const statsData = createTicketsCount(ticketDetails);
  // const {
  //   selectedCurrTicket,
  //   ticketUpdateModal,
  //   editTicket,
  //   closeTicketUpdateModal,
  //   updateTicketFn,
  //   onTicketUpdate,
  // } = useUpdateTicket(fetchTickets);
  // const {
  //   usersUpdateModal,
  //   selectedCurrUser,
  //   closeUsersUpdateModal,
  //   editUser,
  //   changeUserDetails,
  //   updateUserFn,
  // } = useUpdateUser();

  useEffect(() => {
    if (userType === "ENGINEER") {
      navigate("/engineer");
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
        <hr />
        <div className="container">
          <UserTable userDetails={userDetails} fetchUsers={fetchUsers} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
