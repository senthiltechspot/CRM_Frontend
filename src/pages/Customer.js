import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAllTickets } from "../api/ticket";
import TicketTables from "../components/TicketTables";
import { useNavigate } from "react-router-dom";
import StatusDashBoard from "../components/StatusDashboard/StatusDashBoard";

function Customer() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const [ticketDetails, setTicketDetails] = useState([]);

  const [statsData, setStatsData] = useState({
    open: 0,
    inprogress: 0,
    closed: 0,
    blocked: 0,
  });

  useEffect(() => {
    if (userType === "ADMIN") {
      navigate("/admin");
    } else if (userType === "CUSTOMER") {
      navigate("/customer");
    }
    console.log("first");
    fetchTickets();

    // eslint-disable-next-line
  }, []);

  const fetchTickets = () => {
    getAllTickets()
      .then((res) => {
        const data = res.data;
        setTicketDetails(res.data);
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
  };
  // const updateStatusData = () => {};

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

export default Customer;
