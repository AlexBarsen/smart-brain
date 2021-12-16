import React, { useState } from "react";
import "./Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { User } from "../interfaces";

interface Inputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  loadUser: (user: User) => void;
}

const Register: React.FC<Props> = ({ loadUser }) => {
  const [inputValues, setInputValues] = useState<Inputs>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const onSubmit = (event: any) => {
    event?.preventDefault();

    const { password, confirmPassword } = inputValues;

    if (password === confirmPassword) {
      fetch("http://localhost:3001/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValues),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.id) loadUser(user);
        });
    } else {
      alert("Password don't match");
    }
  };

  return (
    <>
      <Form className="register center flex-column" onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            as="input"
            type="email"
            placeholder="Enter email"
            onChange={onInputChange}
            required={true}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Username"
            onChange={onInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Password"
            onChange={onInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
