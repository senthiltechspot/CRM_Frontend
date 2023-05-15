import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getAllTickets } from "../api/ticket";
import TicketTables from "../components/TicketTables";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UsersTable";
import { getAllUsers } from "../api/users";

function Admin() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("name");

  const [ticketDetails, setTicketDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const [statsData, setStatsData] = useState({
    open: 0,
    inprogress: 0,
    closed: 0,
    blocked: 0,
  });

  useEffect(() => {
    if (userType === "ENGINEER") {
      navigate("/engineer");
    } else if (userType === "CUSTOMER") {
      navigate("/customer");
    }

    fetchTickets();

    fetchUsers();
  }, [userType]);

  const fetchUsers = () => {
    getAllUsers()
      .then((res) => {
        console.log(res.data);
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchTickets = () => {
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
      // .then(() => {
      //   updateStatusData();
      // })
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
        <div className="container">
          <div>
            <h3 className="text-primary text-center"> Welcome, {userName} </h3>
            <p className="text-center text-muted">
              Take a quick look at your admin stats below
            </p>

            <div className="row text-center">
              <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                <div className="card cardItem shadow  bg-primary text-dark bg-opacity-25 border border-primary">
                  <div className="card-body">
                    <h5 className="mb-2">
                      <i className="text-primary bi bi-pencil mx-2"></i>
                      Open
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <h1 className="text-dark mx-4">
                          {statsData ? statsData.open : "na"}
                        </h1>
                      </div>
                      <div className="col">
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbar
                            value={statsData ? 100/ticketDetails.length*statsData.open : 0}
                            styles={buildStyles({
                              textColor: "red",
                              pathColor: "darkBlue",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                <div className="card cardItem shadow  bg-warning text-dark bg-opacity-25 border border-warning">
                  <div className="card-body">
                    <h5 className="mb-2">
                      <i className="text-warning bi bi-lightning-charge mx-2">
                        Progress
                      </i>
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <h1 className="text-dark mx-4">
                          {statsData ? statsData.inprogress : 0}
                        </h1>
                      </div>
                      <div className="col">
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbar
                            value={statsData ? 100/ticketDetails.length*statsData.inprogress : 0}
                            styles={buildStyles({
                              textColor: "red",
                              pathColor: "#AA6C39",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                <div className="card cardItem shadow  bg-success text-dark bg-opacity-25 border border-success">
                  <div className="card-body">
                    <h5 className="mb-2">
                      <i className="text-success bi bi-check-circle mx-2">
                        Closed
                      </i>
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <h1 className="text-dark mx-4">{statsData.closed}</h1>
                      </div>
                      <div className="col">
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbar
                            value={100/ticketDetails.length*statsData.closed}
                            styles={buildStyles({
                              textColor: "red",
                              pathColor: "green",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                <div className="card cardItem shadow  bg-secondary text-dark bg-opacity-25 border border-secondary">
                  <div className="card-body">
                    <h5 className="mb-2">
                      <i className="text-dark bi bi-slash-circle mx-2">
                        Blocked
                      </i>
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <h1 className="text-dark mx-4">{statsData.blocked}</h1>
                      </div>
                      <div className="col">
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbar
                            value={100/ticketDetails.length*statsData.blocked}
                            styles={buildStyles({
                              textColor: "red",
                              pathColor: "black",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="container">
          <TicketTables ticketDetails={ticketDetails} />
        </div>
        <hr />
        <div className="container">
          <UserTable userDetails={userDetails} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
