import React, { useState } from "react";
import "./SignIn.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface Inputs {
  email: string;
  password: string;
}

interface Props {
  onRouteChange: (route: string) => void;
}

const SignIn: React.FC<Props> = ({ onRouteChange }) => {
  const [inputValues, setInputValues] = useState<Inputs>({
    email: "",
    password: "",
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <>
      <Form className="signIn center flex-column">
        <Form.Group className="mb-3 text-left" controlId="formBasicEmail">
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => onRouteChange("home")}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignIn;
