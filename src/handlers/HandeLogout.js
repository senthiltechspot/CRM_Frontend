const HandeLogout = () => {
  localStorage.clear();

  return (window.location.href = "/");
};

export default HandeLogout;
