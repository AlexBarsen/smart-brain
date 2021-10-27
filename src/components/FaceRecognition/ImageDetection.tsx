import React from "react";
import "./ImageDetection.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "../ListGroupItem/ListGroupItem";
import GeneralConceptsList from "../GeneralConceptsList/GeneralConceptsList";
import { DetectionValues, GeneralConcepts } from "../interfaces";
import CelebrityConceptsList from "../CelebrityConceptsList/CelebrityConceptsList";

interface Props {
  imageUrl: string;
  detection: {
    detectedValues: any;
    generalConcepts: GeneralConcepts[];
  };
}

const ImageDetection: React.FC<Props> = ({ imageUrl, detection }) => {
  console.log(detection);
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
          <div className="cardDescripition mb-4">
            <Card.Text>
              <Card.Title className="mb-3">
                The top 3 concepts in the image are:
              </Card.Title>

              <ListGroup as="ol" numbered>
                {detection.generalConcepts.slice(0, 3).map((concept) => (
                  <ListGroupItem topLists={true} data={concept} />
                ))}
              </ListGroup>
            </Card.Text>

            <Card.Text>
              <Card.Title className="mb-3">
                If there are celebrities in the image they could be:
              </Card.Title>
              <ListGroup as="ol" numbered>
                {detection.detectedValues.length
                  ? detection.detectedValues.map((detectedValue: any) => (
                      <>
                        {detectedValue.celebrityConcepts
                          .slice(0, 1)
                          .map((celebrity: any) => (
                            <ListGroupItem topLists={true} data={celebrity} />
                          ))}
                      </>
                    ))
                  : null}
              </ListGroup>
            </Card.Text>
          </div>

          <GeneralConceptsList generalConcepts={detection.generalConcepts} />
          <CelebrityConceptsList detectedValues={detection.detectedValues} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default ImageDetection;
