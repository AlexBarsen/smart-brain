import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import { DetectionValues } from "../interfaces";

interface Props {
  detectedValues: any;
}

const CelebrityConceptsList: React.FC<Props> = ({ detectedValues }) => {
  return (
    <>
      {detectedValues.length
        ? detectedValues.map((detectedPerson: any, index: number) => (
            <Accordion defaultActiveKey="1" key={index}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Person #{index + 1}</Accordion.Header>
                <Accordion.Body>
                  {detectedPerson.celebrityConcepts.map((concept: any) => (
                    <ListGroup as="ul" numbered>
                      <ListGroup.Item
                        key={concept.id}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">
                            {concept.name.charAt(0).toUpperCase() +
                              concept.name.slice(1)}
                          </div>
                        </div>
                        <Badge pill>{concept.probability}</Badge>
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        : null}
    </>
  );
};

export default CelebrityConceptsList;
