import React from "react";
import { Modal, Button } from "react-bootstrap";
import BackDrop from "./BackDrop";

const UserModal = ({
  usersUpdateModal,
  selectedCurrUser,
  closeUsersUpdateModal,
  changeUserDetails,
  updateUserFn,
  Loading,
}) => {
  return (
    <Modal show={usersUpdateModal} onHide={closeUsersUpdateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={updateUserFn}>
          <div className="p-1">
            <h5 className="card-subtitle mb-2 text-primary">
              username : {selectedCurrUser.username}
            </h5>

            <h5 className="card-subtitle mb-2 text-primary">
              UserType : {selectedCurrUser.userTypes}
            </h5>
            <div className="input-group mb-3">
              <span className="input-group-text"> Name </span>
              <input
                type="text"
                disabled
                name="user"
                value={selectedCurrUser.name}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"> email </span>
              <input
                type="text"
                disabled
                name="email"
                value={selectedCurrUser.email}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text"> Status </span>

              <select
                name="status"
                value={selectedCurrUser.userStatus}
                onChange={changeUserDetails}
                className="form-select"
              >
                <option value="APPROVED"> APPROVED </option>
                <option value="PENDING"> PENDING </option>
                <option value="REJECTED"> REJECTED </option>
              </select>
            </div>
          </div>

          <Button variant="secondary" onClick={closeUsersUpdateModal}>
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

export default UserModal;
