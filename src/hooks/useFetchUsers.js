import { getAllUsers } from "../api/users";
import { useState, useEffect } from "react";

const useFetchUsers = () => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getAllUsers()
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return [userDetails, fetchUsers];
};

export default useFetchUsers;

