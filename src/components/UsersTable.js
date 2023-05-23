import React from "react";
import MaterialTable from "material-table";
import { Modal, Button } from "react-bootstrap";
import BackDrop from "./BackDrop";
import useUpdateUser from "../hooks/useUpdateUser";
import AlertSnackBar from "./AlertSnackBar";

const UserTable = ({ userDetails, fetchUsers }) => {

  const {
    usersUpdateModal,
    selectedCurrUser,
    closeUsersUpdateModal,
    editUser,
    changeUserDetails,
    updateUserFn,
    Loading,
    Message,
    AlertType,
    OpenAlert,
    setOpenAlert,
  } = useUpdateUser(fetchUsers);
  
  return (
    <div>
      <MaterialTable
        title="User Details"
        columns={[
          { title: "ID", field: "_id", filtering: false },
          { title: "NAME", field: "name" },
          { title: "EMAIL", field: "email" },
          { title: "USER ID", field: "userId" },
          {
            title: "USER TYPE",
            field: "userTypes",
            lookup: {
              ADMIN: "ADMIN",
              ENGINEER: "ENGINEER",
              CUSTOMER: "CUSTOMER",
            },
          },
          {
            title: "USER STATUS",
            field: "userStatus",
            lookup: {
              PENDING: "PENDING",
              APPROVED: "APPROVED",
              REJECTED: "REJECTED",
            },
          },
        ]}
        data={userDetails}
        onRowClick={(event, rowData) => editUser(rowData)}
        options={{
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          filtering: true,
        }}
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
        <BackDrop openBackDrop={Loading} />
      </Modal>
      <AlertSnackBar
        Message={Message}
        AlertType={AlertType}
        OpenAlert={OpenAlert}
        setOpenAlert={setOpenAlert}
      />
    </div>
  );
};

export default UserTable;
