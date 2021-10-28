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
    <>
      <Accordion
        defaultActiveKey="1"
        className="mb-3"
        style={{ width: "450px" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>General Concepts</Accordion.Header>
          <Accordion.Body>
            <ListGroup as="ol" numbered>
              {generalConcepts.map((concept) => (
                <ListGroupItem
                  topLists={false}
                  data={concept}
                  key={concept.id}
                />
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default GeneralConceptsList;
