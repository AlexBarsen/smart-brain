import React from "react";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "../ListGroupItem/ListGroupItem";
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
          <ListGroup as="ol" numbered>
            {generalConcepts.map((concept) => (
              <ListGroupItem topLists={false} data={concept} />
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default GeneralConceptsList;
