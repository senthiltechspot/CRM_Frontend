import { getAllTickets } from "../api/ticket";
import { useState, useEffect } from "react";

const useFetchTickets = () => {
  const [ticketDetails, setTicketDetails] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    getAllTickets()
      .then((res) => {
        setTicketDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return [ticketDetails, fetchTickets];
};

export default useFetchTickets;
