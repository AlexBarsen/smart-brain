import React, { useState } from "react";
import "./Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface Inputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [inputValues, setInputValues] = useState<Inputs>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (event: any) => {
    const { value, name } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <>
      <Form className="register center flex-column">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={onInputChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Username"
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Password"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
