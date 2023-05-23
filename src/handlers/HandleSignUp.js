import { userSignUp } from "../api/auth";

const HandleSignUp = (
  setMessage,
  setError,
  loginForm,
  setOpenBackDrop,
  setOpenAlert,
  setAlertType
) => {
  if (loginForm.userId.length < 5) {
    setError(true);
    setMessage("userId should be of 5 to 10 characters");
    return;
  } else if (loginForm.password.length < 5 || loginForm.password.length > 12) {
    setError(true);
    setMessage("Password should of 5 to 12 characters");
    return;
  }

  //API call
  setOpenBackDrop(true);

  userSignUp(loginForm)
    .then((res) => {
      console.log(res);
      setError(false);
      setMessage("SignUp successful");
      window.location.href = "/";
      setOpenBackDrop(false);
      setAlertType("success");
      setMessage("SignUp Sucessfull");
      setOpenAlert(true);
    })
    .catch((err) => {
      if (err.response.status === 400) {
        setOpenBackDrop(false);
        setError(true);
        setMessage(err.response.data.message);
        setAlertType("error");
        setOpenAlert(true);
      }
    });
  return;
};

export default HandleSignUp;
