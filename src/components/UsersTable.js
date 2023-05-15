import React from "react";
import MaterialTable from "material-table";
const UserTable = ({ userDetails }) => {
  return (
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
    />
  );
};

export default UserTable;
