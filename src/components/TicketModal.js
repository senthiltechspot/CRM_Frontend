import React from "react";
import { Modal, Button } from "react-bootstrap";
import fetchDisabledFields from "../utils/fetchDisabledData";
import BackDrop from "./BackDrop";

const TicketModal = ({
  selectedCurrTicket,
  ticketUpdateModal,
  closeTicketUpdateModal,
  updateTicketFn,
  onTicketUpdate,
  Loading,
}) => {
  const disabledFields = fetchDisabledFields();

  return (
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
                disabled={disabledFields.title}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"> Assignee </span>
              <input
                disabled={disabledFields.assignee}
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
                disabled={disabledFields.status}
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
                disabled={disabledFields.description}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"> Priority </span>
              <input
                type="text"
                name="ticketPriority"
                value={selectedCurrTicket.ticketPriority}
                onChange={onTicketUpdate}
                disabled={disabledFields.priority}
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
      <BackDrop openBackDrop={Loading} />
    </Modal>
  );
};

export default TicketModal;
