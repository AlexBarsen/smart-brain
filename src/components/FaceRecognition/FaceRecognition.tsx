import React from "react";
import "./FaceRecognition.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GeneralConceptsList from "../GeneralConceptsList/GeneralConceptsList";
import { DetectionValues, GeneralConcepts } from "../interfaces";
import CelebrityConceptsList from "../CelebrityConceptsList/CelebrityConceptsList";

interface Props {
  imageUrl: string;
  detection: {
    detectedValues: DetectionValues[];
    generalConcepts: GeneralConcepts[];
  };
}

const FaceRecognition: React.FC<Props> = ({ imageUrl, detection }) => {
  // const capitalizeName = (name: string) => {
  //   const fullName = name.split(" ");
  //   return fullName
  //     .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
  //     .join(" ");
  // };

  // const convertToPercentage = (value: number) => {
  //   const percentage = value * 100;
  //   return percentage.toString().substring(0, 4) + "%";
  // };

  return (
    <div className="center">
      <Card style={{ width: "750px" }}>
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
          <Card.Title style={{ justifyContent: "flex-start", display: "flex" }}>
            Concepts in Image:
          </Card.Title>
          <Card.Text>Top 3 concepts in the image are:</Card.Text>
          <Card.Text>
            If the there are celebrities in the image Smart Brain suggests they
            are:
          </Card.Text>
          <GeneralConceptsList generalConcepts={detection.generalConcepts} />
          <CelebrityConceptsList detectedValues={detection.detectedValues} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default FaceRecognition;
