import { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Auth() {
  const [isLogin, setisLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    username: "",
    name: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };
  const onSubmitForm = (e) => {
    // preventDefault();
    console.log(loginForm);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 bg-primary ">
      <Card style={{ width: "24rem" }} className="bg-info p-5 rounded">
        {isLogin ? (
          <div>
            <Form onSubmit={onSubmitForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={loginForm.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={loginForm.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={onSubmitForm}>
                Log In
              </Button>

              <Form.Group>
                <Form.Text className="text-muted">
                  Don't Have an Account.
                  <a onClick={() => setisLogin(!isLogin)} className="pe-auto">
                    Sign Up
                  </a>
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        ) : (
          <div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={loginForm.username}
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={loginForm.email}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={loginForm.name}
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={loginForm.password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={onSubmitForm}>
                Sign Up
              </Button>
              <Form.Group>
                <Form.Text className="text-muted">
                  Already Have an Account.
                  <a onClick={() => setisLogin(!isLogin)} className="pe-auto">
                    Login
                  </a>
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
}
