import React, { useState } from "react";
import MaterialTable from "material-table";
import { Modal, Button } from "react-bootstrap";
import { updateUser } from "../api/users";
const UserTable = ({ userDetails, fetchUsers }) => {
  const [usersUpdateModal, setUsersUpdateModal] = useState(false);
  const [selectedCurrUser, setSelectedCurrUser] = useState(false);

  const closeUsersUpdateModal = () => {
    setUsersUpdateModal(false);
  };

  const editUser = (userDetail) => {
    setSelectedCurrUser(userDetail);
    setUsersUpdateModal(true);
  };

  const changeUserDetails = (e) => {
    if (e.target.name === "status") {
      selectedCurrUser.userStatus = e.target.value;
    }

    setSelectedCurrUser({ ...selectedCurrUser });
  };

  const updateUserFn = (e) => {
    e.preventDefault();

    const userData = {
      _id: selectedCurrUser._id,
      status: selectedCurrUser.userStatus,
    };

    updateUser(userData)
      .then((res) => {
        if (res.status === 200) {
          console.log("User Updated Successfully");
          setUsersUpdateModal(false);
          fetchUsers();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <MaterialTable
        title="User Details"
        columns={[
          { title: "ID", field: "_id" },
          { title: "NAME", field: "name" },
          { title: "EMAIL", field: "email" },
          { title: "USER ID", field: "userId" },
          { title: "USER TYPE", field: "userTypes" },
          { title: "USER STATUS", field: "userStatus" },
        ]}
        data={userDetails}
        onRowClick={(event, rowData) => editUser(rowData)}
      />
      <Modal show={usersUpdateModal} onHide={closeUsersUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={updateUserFn}>
            <div className="p-1">
              <h5 className="card-subtitle mb-2 text-primary">
                UserId : {selectedCurrUser.userId}
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
      </Modal>
    </div>
  );
};

export default UserTable;
