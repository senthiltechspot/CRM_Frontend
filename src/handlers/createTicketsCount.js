import constants from "../utils/constants";

export const createTicketsCount = (tickets) => {
  const data = {
    open: 0,
    closed: 0,
    inprogress: 0,
    blocked: 0,
  };

  tickets.forEach((ticket) => {
    if (ticket.status === constants.ticketStatus.open) data.open += 1;
    else if (ticket.status === constants.ticketStatus.inProgress)
      data.inprogress += 1;
    else if (ticket.status === constants.ticketStatus.blocked)
      data.blocked += 1;
    else data.closed += 1;
  });

  return data;
};
