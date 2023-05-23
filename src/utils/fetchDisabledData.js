import constants from "./constants";

const fetchDisabledFields = () => {
  const disabledFields = {
    title: false,
    assignee: false,
    status: false,
    description: false,
    priority: false,
  };

  const userType = localStorage.getItem(constants.userAttributeFields.userType);

  if (userType === constants.userTypes.engineer) {
    disabledFields.title = true;
    disabledFields.assignee = true;
    disabledFields.priority = true;
  }

  if (userType === constants.userTypes.customer) {
    disabledFields.assignee = true;
  }

  return disabledFields;
};

export default fetchDisabledFields;
