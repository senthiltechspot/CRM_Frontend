import { Skeleton } from "@mui/material";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const StatusCard = ({
  colors,
  pathcolors,
  statsData,
  ticketLength,
  bicon,
  type,
}) => {

  return (
    <div className="col-xs-12 col-lg-3 col-md-6 my-1">
      {ticketLength ? (
        <div
          className={
            "card cardItem shadow text-dark bg-opacity-25 border  " +
            `bg-${colors} border-${colors}`
          }
        >
          <div className="card-body">
            <h5 className="mb-2">
              <i className={`mx-2 bi bi-${bicon} text-${colors}`}>{type}</i>
            </h5>
            <hr />
            <div className="row">
              <div className="col">
                <h1 className="text-dark mx-4">{statsData ? statsData : 0}</h1>
              </div>
              <div className="col">
                <div style={{ width: 60, height: 60 }}>
                  <CircularProgressbar
                    value={statsData ? (100 / ticketLength) * statsData : 0}
                    styles={buildStyles({
                      textColor: "red",
                      pathColor: `${pathcolors}`,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton variant="rounded" width={"100%"} height={150} />
      )}
    </div>
  );
};

export default StatusCard;
