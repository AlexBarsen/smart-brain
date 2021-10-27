import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import ListGroupItem from "../ListGroupItem/ListGroupItem";
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
                  <ListGroup as="ul" numbered>
                    {detectedPerson.celebrityConcepts.map((celebrity: any) => (
                      <ListGroupItem topLists={false} data={celebrity} />
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        : null}
    </>
  );
};

export default CelebrityConceptsList;
