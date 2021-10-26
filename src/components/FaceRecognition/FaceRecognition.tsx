import React from "react";
import "./FaceRecognition.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { DetectionValues, GeneralConcepts } from "../../interfaces";

interface Props {
  imageUrl: string;
  detection: {
    detectedValues: DetectionValues[];
    generalConcepts: GeneralConcepts[];
  };
}

const FaceRecognition: React.FC<Props> = ({ imageUrl, detection }) => {
  console.log(detection);
  const capitalizeName = (name: string) => {
    const fullName = name.split(" ");
    return fullName
      .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
  };

  const convertToPercentage = (value: number) => {
    const percentage = value * 100;
    return percentage.toString().substring(0, 4) + "%";
  };

  return (
    <div className="center">
      <Card style={{ width: "600px" }}>
        <div style={{ position: "relative" }}>
          <Card.Img id="inputImage" variant="top" src={imageUrl} />
          {detection.detectedValues.length
            ? detection.detectedValues.map(
                (boundingBox: any, index: number) => (
                  <div key={boundingBox.id}>
                    <div
                      className="bounding-box"
                      style={{
                        top: boundingBox.topRow,
                        right: boundingBox.rightCol,
                        bottom: boundingBox.bottomRow,
                        left: boundingBox.leftCol,
                      }}
                    >
                      <div className="bounding-box--number">{index + 1}</div>
                    </div>
                  </div>
                )
              )
            : null}
        </div>
        <Card.Body>
          <Card.Title>Smart brain has detected the follwing:</Card.Title>
          {/* {detection.length ? (
            <Card.Text>Faces detected in image: {detection.length}</Card.Text>
          ) : null} */}
          {/* <Card.Text>
            The algorith suggests it might be a celebrity with the follwing %:
          </Card.Text> */}
          {detection.detectedValues.length
            ? detection.detectedValues.map((box: any, index: number) => (
                <div key={index}>
                  <p>Face number {index + 1}</p>
                  {box.celebrityConcepts.map((concept: any, index: number) => (
                    <p key={concept.id}>
                      {index + 1}: {capitalizeName(concept.name)} with a
                      probabilty of: {convertToPercentage(concept.value)}
                    </p>
                  ))}
                </div>
              ))
            : null}

          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FaceRecognition;
