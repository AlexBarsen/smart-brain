import React from "react";
import "./ImageDetection.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "../ListGroupItem/ListGroupItem";
import GeneralConceptsList from "../GeneralConceptsList/GeneralConceptsList";
import {
  DetectionValues,
  GeneralConcepts,
  CelebrityConcepts,
  BoundingBox,
} from "../interfaces";
import CelebrityConceptsList from "../CelebrityConceptsList/CelebrityConceptsList";

interface Props {
  imageUrl: string;
  detection: {
    detectedValues: DetectionValues[];
    generalConcepts: GeneralConcepts[];
  };
}

const ImageDetection: React.FC<Props> = ({ imageUrl, detection }) => {
  return (
    <div className="center mb-4">
      <Card style={{ width: "510px" }}>
        <div style={{ position: "relative" }}>
          <Card.Img id="inputImage" variant="top" src={imageUrl} />

          {detection.detectedValues.map(
            (boundingBox: BoundingBox, index: number) => (
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
          )}
        </div>
        {detection.detectedValues.length ? (
          <>
            {" "}
            <Card.Body style={{ paddingBottom: "0" }}>
              <div className="cardDescripition">
                <div className="mb-4">
                  <Card.Title className="mb-3">
                    The top 3 concepts in the image are:
                  </Card.Title>

                  <ListGroup as="ol" numbered>
                    {detection.generalConcepts.slice(0, 3).map((concept) => (
                      <ListGroupItem
                        topLists={true}
                        data={concept}
                        key={concept.id}
                      />
                    ))}
                  </ListGroup>
                </div>

                <div>
                  <Card.Title className="mb-3">
                    If there are celebrities in the image they could be:
                  </Card.Title>
                  <ListGroup as="ol" numbered>
                    {detection.detectedValues.map(
                      (detectedValue: DetectionValues, index: number) => (
                        <div key={index}>
                          {detectedValue.celebrityConcepts
                            .slice(0, 1)
                            .map((celebrity: CelebrityConcepts) => (
                              <ListGroupItem
                                topLists={true}
                                data={celebrity}
                                key={celebrity.id}
                              />
                            ))}
                        </div>
                      )
                    )}
                  </ListGroup>{" "}
                </div>
                <GeneralConceptsList
                  generalConcepts={detection.generalConcepts}
                />
                <CelebrityConceptsList
                  detectedValues={detection.detectedValues}
                />
              </div>
            </Card.Body>
          </>
        ) : (
          <Card.Title style={{ margin: "0", padding: "20px" }}>
            This application will detect faces, suggest if a person is a
            celebrity with a probability and the general concepts present in it
          </Card.Title>
        )}
      </Card>
    </div>
  );
};

export default ImageDetection;
