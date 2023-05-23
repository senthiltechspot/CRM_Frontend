import { useState } from "react";
import { userSignUp, userSignIn } from "../api/auth";
import { Backdrop, CircularProgress } from "@mui/material";

function Login() {
  const [showSignup, setShowSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    name: "",
    userId: "",
    userType: "CUSTOMER",
  });

  // Handle Title Render
  if (showSignup) {
    document.title = "CRM - Sign Up";
  } else {
    document.title = "CRM - Log In";
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const toggleSignup = () => {
    clearState();
    setShowSignUp(!showSignup);
  };

  const clearState = () => {
    setLoginForm({
      email: "",
      password: "",
      name: "",
      userId: "",
      userType: "CUSTOMER",
    });
  };

  const onSignUp = (e) => {
    e.preventDefault();

    if (loginForm.userId.length < 5) {
      setError(true);
      setMessage("userId should be of 5 to 10 characters");
      return;
    } else if (
      loginForm.password.length < 5 ||
      loginForm.password.length > 12
    ) {
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
        clearState();
        setOpenBackDrop(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setOpenBackDrop(false);
          setError(true);
          setMessage(err.response.data.message);
        }
      });
  };

  const onLogin = (e) => {
    e.preventDefault();
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
        clearState();
        setOpenBackDrop(false);
      })
      .catch((err) => {
        if (err.response.status) {
          setOpenBackDrop(false);
          setError(true);
          setMessage(err.response.data.message);
        }
      });
  };

  return (
    <div
      className=" d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(" https://source.unsplash.com/random/?Animals+Art+Textures+Landscape&1")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="card p-4 rounded-4 shadow-lg align-items-center">
        <h4 className="text-info"> {showSignup ? "Sign Up" : "Log In"} </h4>

        <form onSubmit={showSignup ? onSignUp : onLogin}>
          <div className="input-group">
            <input
              className="form-control m-1"
              type="text"
              value={loginForm.userId}
              id="userId"
              name="userId"
              onChange={handleInputChange}
              placeholder="userId"
            />
          </div>

          {showSignup && (
            <>
              <div className="input-group">
                <input
                  className="form-control m-1"
                  type="text"
                  value={loginForm.name}
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </div>

              <div className="input-group">
                <input
                  name="email"
                  className="form-control m-1"
                  value={loginForm.email}
                  id="email"
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Email"
                />
              </div>
            </>
          )}

          <div className="input-group">
            <input
              className="form-control m-1"
              value={loginForm.password}
              id="password"
              onChange={handleInputChange}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <div className="input-group">
            {showSignup && (
              <div className="input-group m-1">
                <span className="input-group-text"> UserType </span>

                <select
                  name="userType"
                  value={loginForm.userType}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="CUSTOMER"> CUSTOMER </option>
                  <option value="ENGINEER"> ENGINEER </option>
                </select>
              </div>
            )}
          </div>

          <div className="input-group">
            <input
              className="btn btn-info form-control text-white m-1 cursor-pointer"
              type="submit"
              value={showSignup ? "Sign Up" : "Log In"}
            />
          </div>

          <div>
            {showSignup ? (
              <>
                <p>
                  Already have an account ?
                  <a
                    href="#Signup"
                    className="text-info m-1"
                    onClick={toggleSignup}
                  >
                    LogIn
                  </a>
                </p>
              </>
            ) : (
              <>
                <p>
                  Don't have an account ?
                  <a
                    href="#Login"
                    className="text-info m-1"
                    onClick={toggleSignup}
                  >
                    Sign Up
                  </a>
                </p>
              </>
            )}
          </div>

          <div className={error ? "text-danger" : "text-success"}>
            {message}
          </div>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}

export default Login;
