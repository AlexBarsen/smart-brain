import React from "react";
import "./Navigation.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

interface Props {
  onRouteChange: (route: string) => void;
}

const Navigation: React.FC<Props> = ({ onRouteChange }) => {
  return (
    <>
      <Navbar bg="transparent" expand="lg">
        <Container className="justify-content-end">
          <Nav>
            <Nav.Link
              className="h4"
              style={{ fontWeight: "normal" }}
              onClick={() => onRouteChange("signIn")}
            >
              <u>Sign In</u>
            </Nav.Link>
            <Nav.Link
              className="h4"
              style={{ fontWeight: "normal" }}
              onClick={() => onRouteChange("register")}
            >
              <u>Register</u>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
