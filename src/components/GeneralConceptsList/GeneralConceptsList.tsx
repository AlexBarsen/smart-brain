import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { GeneralConcepts } from "../interfaces";

interface Props {
  generalConcepts: GeneralConcepts[];
}

const GeneralConceptsList: React.FC<Props> = ({ generalConcepts }) => {
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>General Concepts</Accordion.Header>
        <Accordion.Body>
          {generalConcepts.map((concept) => (
            <ListGroup as="ol" numbered>
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
  );
};

export default GeneralConceptsList;
