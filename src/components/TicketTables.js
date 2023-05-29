import React from "react";
import MaterialTable from "material-table";
import useUpdateTicket from "../hooks/useUpdateTicket";
import TicketModal from "./TicketModal";

const TicketTables = ({ ticketDetails, fetchTickets }) => {
  const {
    selectedCurrTicket,
    ticketUpdateModal,
    editTicket,
    closeTicketUpdateModal,
    updateTicketFn,
    onTicketUpdate,
    Loading,
  } = useUpdateTicket(fetchTickets);
console.log(ticketDetails)
  return (
    <div className="container">
      <MaterialTable
        title="Tickets"
        columns={[
          { title: "ID", field: "_id", filtering: false },
          { title: "Title", field: "title" },
          { title: "Priority", field: "ticketPriority", type: "numeric" },
          { title: "Description", field: "description" },
          { title: "Assignee", field: "assignee" },
          {
            title: "Status",
            field: "status",
            lookup: {
              OPEN: "OPEN",
              CLOSED: "CLOSED",
              INPROGRESS: "INPROGRESS",
              BLOCKED: "BLOCKED",
            },
          },
        ]}
        data={ticketDetails}
        onRowClick={(event, rowData) => editTicket(rowData)}
        options={{
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          filtering: true,
        }}
      />
      <TicketModal
        fetchTickets={fetchTickets}
        selectedCurrTicket={selectedCurrTicket}
        ticketUpdateModal={ticketUpdateModal}
        closeTicketUpdateModal={closeTicketUpdateModal}
        updateTicketFn={updateTicketFn}
        onTicketUpdate={onTicketUpdate}
        Loading={Loading}
      />
    </div>
  );
};

export default TicketTables;
