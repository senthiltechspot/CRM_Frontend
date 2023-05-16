import React from "react";
import StatusCard from "./StatusCard";

const StatusDashBoard = ({ ticketLength, statsData }) => {
  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("name");
  
  return (
    <div className="container">
      <div>
        <h3 className="text-primary text-center"> Welcome, {userName} </h3>
        <p className="text-center text-muted">
          Take a quick look at your {userType.toLocaleLowerCase()} stats below
        </p>

        <div className="row text-center">
          <StatusCard
            colors={"primary"}
            pathcolors={"darkBlue"}
            statsData={statsData.open}
            ticketLength={ticketLength}
            bicon={"pencil"}
            type={"Open"}
          />
          <StatusCard
            colors={"warning"}
            pathcolors={"#AA6C39"}
            statsData={statsData.inprogress}
            ticketLength={ticketLength}
            bicon={"lightning"}
            type={"Inprogress"}
          />
          <StatusCard
            colors={"success"}
            pathcolors={"green"}
            statsData={statsData.closed}
            ticketLength={ticketLength}
            bicon={"lightning-charge"}
            type={"Closed"}
          />
          <StatusCard
            colors={"secondary"}
            pathcolors={"black"}
            statsData={statsData.blocked}
            ticketLength={ticketLength}
            bicon={"check-circle"}
            type={"Blocked"}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusDashBoard;
