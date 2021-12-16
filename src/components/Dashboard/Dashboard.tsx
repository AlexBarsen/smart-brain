import React from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { User } from "../interfaces";
import "./Dashboard.css";

interface Props {
  user: User;
  entries: any;
}

const Dashboard: React.FC<Props> = ({ entries, user }) => {
  const avatar = createAvatar(style, {
    seed: "custom-seed",
    dataUri: true,
  });
  return (
    <Card style={{ width: "18rem", height: "30rem" }} className="card">
      <Card.Img variant="top" src={avatar} />
      <div>
        <Card.Body>
          <Card.Title>Hello {user.username}</Card.Title>
          <Card.Text>
            This is your fellow Robot which will help you detect people and
            concepts in the image.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Image uploaded: {entries}</ListGroupItem>
        </ListGroup>
      </div>
    </Card>
  );
};

export default Dashboard;
