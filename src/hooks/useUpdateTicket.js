import { useContext, useState } from "react";
import { updateTicket } from "../api/ticket";
import { alertContext } from "../context/AlertContext";

const useUpdateTicket = (fetchTickets) => {
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [Loading, setLoading] = useState(false);
  const [, setOpenAlert, , setMessage, , setAlertType] =
    useContext(alertContext);

  const editTicket = (ticketDetail) => {
    setSelectedCurrTicket(ticketDetail);
    setTicketUpdateModal(true);
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

    setLoading(true);
    updateTicket(selectedCurrTicket)
      .then((res) => {
        console.log("Ticket update successfully");
        setTicketUpdateModal(false);
        fetchTickets();
        setLoading(false);
        setAlertType("success");
        setMessage("Ticket Updated Sucessfully");
        setOpenAlert(true);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setAlertType("error");
        setMessage(err.message);
        setOpenAlert(true);
        fetchTickets();
      });
  };

  return {
    selectedCurrTicket,
    ticketUpdateModal,
    editTicket,
    closeTicketUpdateModal,
    updateTicketFn,
    onTicketUpdate,
    Loading,
  };
};

export default useUpdateTicket;
