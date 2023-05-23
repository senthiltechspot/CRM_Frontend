import { userSignIn } from "../api/auth";

const HandleLogin = (
  setMessage,
  setError,
  loginForm,
  setOpenBackDrop,
  setOpenAlert,
  setAlertType
) => {
  setOpenBackDrop(true);
  userSignIn(loginForm)
    .then((res) => {
      console.log(res);
      setError(false);
      setMessage("Login Successful");

      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userStatus", res.data.userStatus);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userType", res.data.userType);

      if (res.data.userType === "ENGINEER") {
        window.location.href = "/engineer";
      } else if (res.data.userType === "CUSTOMER") {
        window.location.href = "/customer";
      } else {
        window.location.href = "/admin";
      }
      setOpenBackDrop(false);
      setAlertType("success");
      setMessage("Login Sucessfull");
      setOpenAlert(true);
    })
    .catch((err) => {
      if (err.response) {
        setOpenBackDrop(false);
        setError(true);
        setMessage(err.response.data.message);
        setAlertType("error");
        setOpenAlert(true);
      }
    });
  return;
};

export default HandleLogin;
