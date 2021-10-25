import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface Props {
  imageUrl: string;
}

const FaceRecognition: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div className="center">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>Smart brain has detected the follwing:</Card.Title>
          <Card.Text>Faces: number of faces</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FaceRecognition;
