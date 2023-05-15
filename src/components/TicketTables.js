import React from "react";
import MaterialTable from "material-table";
const TicketTables = ({ ticketDetails }) => {
  return (
    <MaterialTable
      title="Tickets"
      columns={[
        { title: "ID", field: "_id" },
        { title: "Title", field: "title" },
        { title: "Priority", field: "ticketPriority", type: "numeric" },
        { title: "Description", field: "description" },
        { title: "Assignee", field: "assignee" },
        { title: "Status", field: "status" },
      ]}
      data={ticketDetails}
    />
  );
};

export default TicketTables;
