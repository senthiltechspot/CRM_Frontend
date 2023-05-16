import React, { useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button } from "react-bootstrap";
import { updateTicket } from "../api/ticket";

const TicketTables = ({ ticketDetails, fetchTickets }) => {
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);

  const editTicket = (ticketDetail) => {
    setTicketUpdateModal(true);
    setSelectedCurrTicket(ticketDetail);
  };

  const closeTicketUpdateModal = () => {
    setTicketUpdateModal(false);
  };

  const onTicketUpdate = (e) => {
    const fieldName = e.target.name;

    if (fieldName === "title") selectedCurrTicket.title = e.target.value;
    else if (fieldName === "description")
      selectedCurrTicket.description = e.target.value;
    else if (fieldName === "status") selectedCurrTicket.status = e.target.value;
    else if (fieldName === "assignee")
      selectedCurrTicket.assignee = e.target.value;
    else if (fieldName === "ticketPriority")
      selectedCurrTicket.ticketPriority = e.target.value;

    setSelectedCurrTicket({ ...selectedCurrTicket });
  };

  const updateTicketFn = (e) => {
    e.preventDefault();

    updateTicket(selectedCurrTicket)
      .then((res) => {
        console.log("Ticket update successfully");
        setTicketUpdateModal(false);
        fetchTickets();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
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
        onRowClick={(event, rowData) => editTicket(rowData)}
      />
      <Modal show={ticketUpdateModal} onHide={closeTicketUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={updateTicketFn}>
            <div className="p-1">
              <h5 className="card-subtitle mb-2 text-primary">
                TicketId : {selectedCurrTicket._id}
              </h5>

              <div className="input-group mb-3">
                <span className="input-group-text"> Title </span>
                <input
                  type="text"
                  name="title"
                  value={selectedCurrTicket.title}
                  onChange={onTicketUpdate}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"> Assignee </span>
                <input
                  type="text"
                  name="assignee"
                  value={selectedCurrTicket.assignee}
                  onChange={onTicketUpdate}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"> Status </span>

                <select
                  name="status"
                  value={selectedCurrTicket.status}
                  onChange={onTicketUpdate}
                  className="form-select"
                >
                  <option value="OPEN"> OPEN </option>
                  <option value="INPROGRESS"> INPROGRESS </option>
                  <option value="CLOSED"> CLOSED </option>
                  <option value="BLOCKED"> BLOCKED </option>
                </select>
              </div>

              <div className="input-group mb-3">
                <textarea
                  type="text"
                  className="md-textarea form-control"
                  name="description"
                  rows="4"
                  value={selectedCurrTicket.description}
                  onChange={onTicketUpdate}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"> Priority </span>
                <input
                  type="text"
                  name="ticketPriority"
                  value={selectedCurrTicket.ticketPriority}
                  onChange={onTicketUpdate}
                />
              </div>
            </div>

            <Button variant="secondary" onClick={closeTicketUpdateModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default TicketTables;
