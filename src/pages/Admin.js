import { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAllTickets } from "../api/ticket";
import TicketTables from "../components/TicketTables";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UsersTable";
import { getAllUsers } from "../api/users";
import StatusDashBoard from "../components/StatusDashboard/StatusDashBoard";

function Admin() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const [ticketDetails, setTicketDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const [statsData, setStatsData] = useState({
    open: 0,
    inprogress: 0,
    closed: 0,
    blocked: 0,
  });

  const fetchUsers = useCallback(() => {
    getAllUsers()
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchTickets = useCallback(() => {
    getAllTickets()
      .then((res) => {
        setTicketDetails(res.data);
        let data = res.data;
        console.log(data);
        let OPEN = data.filter((item) => {
          return item.status === "OPEN";
        });
        let CLOSED = data.filter((item) => {
          return item.status === "CLOSED";
        });
        let BLOCKED = data.filter((item) => {
          return item.status === "BLOCKED";
        });
        let INPROGRESS = data.filter((item) => {
          return item.status === "INPROGRESS";
        });
        setStatsData({
          ...statsData,
          open: OPEN.length,
          closed: CLOSED.length,
          blocked: BLOCKED.length,
          inprogress: INPROGRESS.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [statsData]);

  useEffect(() => {
    if (userType === "ENGINEER") {
      navigate("/engineer");
    } else if (userType === "CUSTOMER") {
      navigate("/customer");
    }

    fetchTickets();
    console.log("first");
    fetchUsers();
    // eslint-disable-next-line
  }, []);
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
