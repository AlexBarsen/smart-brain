import React, { useState } from "react";
import "./SignIn.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { User } from "../interfaces";

interface Inputs {
  email: string;
  password: string;
}

interface Props {
  loadUser: (user: User) => void;
}

const SignIn: React.FC<Props> = ({ loadUser }) => {
  const [inputValues, setInputValues] = useState<Inputs>({
    email: "",
    password: "",
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    fetch("https://boiling-savannah-89162.herokuapp.com/signIn", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValues),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
        }
      });
  };

  return (
    <>
      <Form className="signIn center flex-column" onSubmit={onSubmit}>
        <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={onInputChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={onInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </>
  );
};

export default SignIn;
