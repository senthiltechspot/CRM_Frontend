import { useContext, useState } from "react";
// import { userSignUp, userSignIn } from "../api/auth";
// import { Backdrop, CircularProgress } from "@mui/material";
import HandleLogin from "../handlers/HandleLogin";
import { alertContext } from "../context/AlertContext";
import HandleSignUp from "../handlers/HandleSignUp";

function Login() {
  const [showSignup, setShowSignUp] = useState(false);
  const [error, setError] = useState(false);
  const [
    ,
    setOpenAlert,
    Message,
    setMessage,
    ,
    setAlertType,
    ,
    setOpenBackDrop,
  ] = useContext(alertContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
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
      username: "",
      userType: "CUSTOMER",
    });
    setMessage("");
  };

  const onSignUp = (e) => {
    e.preventDefault();
    HandleSignUp(
      setMessage,
      setError,
      loginForm,
      setOpenBackDrop,
      setOpenAlert,
      setAlertType
    );
    clearState();
  };

  const onLogin = (e) => {
    e.preventDefault();
    HandleLogin(
      setMessage,
      setError,
      loginForm,
      setOpenBackDrop,
      setOpenAlert,
      setAlertType
    );
    clearState();
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
              value={loginForm.username}
              id="username"
              name="username"
              onChange={handleInputChange}
              placeholder="username"
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
            {Message}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
