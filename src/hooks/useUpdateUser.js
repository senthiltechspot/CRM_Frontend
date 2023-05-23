import { useContext, useState } from "react";
import { updateUser } from "../api/users";
import { alertContext } from "../context/AlertContext";

const useUpdateUser = (fetchUsers) => {
  const [usersUpdateModal, setUsersUpdateModal] = useState(false);
  const [selectedCurrUser, setSelectedCurrUser] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [, setOpenAlert, , setMessage, , setAlertType] =
    useContext(alertContext);

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
    setLoading(true);
    const userData = {
      _id: selectedCurrUser._id,
      status: selectedCurrUser.userStatus,
    };

    updateUser(userData)
      .then((res) => {
        if (res.status === 200) {
          console.log("User Updated Successfully");
          setUsersUpdateModal(false);
          setLoading(false);
          fetchUsers();
          setAlertType("success");
          setMessage("User Updated Sucessfully");
          setOpenAlert(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setAlertType("error");
        setMessage(err.message);
        setOpenAlert(true);
        fetchUsers();
      });
  };

  return {
    usersUpdateModal,
    selectedCurrUser,
    closeUsersUpdateModal,
    editUser,
    changeUserDetails,
    updateUserFn,
    Loading,
  };
};

export default useUpdateUser;
