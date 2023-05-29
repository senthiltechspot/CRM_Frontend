import React from "react";
import MaterialTable from "material-table";
import useUpdateUser from "../hooks/useUpdateUser";
import UserModal from "./UserModal";

const UserTable = ({ userDetails, fetchUsers }) => {
  const {
    editUser,
    usersUpdateModal,
    selectedCurrUser,
    closeUsersUpdateModal,
    changeUserDetails,
    updateUserFn,
    Loading,
  } = useUpdateUser(fetchUsers);

  return (
    <div>
      <MaterialTable
        title="User Details"
        columns={[
          { title: "ID", field: "_id", filtering: false },
          { title: "NAME", field: "name" },
          { title: "EMAIL", field: "email" },
          { title: "USER ID", field: "username" },
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
      <UserModal
        usersUpdateModal={usersUpdateModal}
        selectedCurrUser={selectedCurrUser}
        closeUsersUpdateModal={closeUsersUpdateModal}
        changeUserDetails={changeUserDetails}
        updateUserFn={updateUserFn}
        Loading={Loading}
      />
    </div>
  );
};

export default UserTable;
