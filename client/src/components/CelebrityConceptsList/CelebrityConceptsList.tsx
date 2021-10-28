import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import ListGroupItem from "../ListGroupItem/ListGroupItem";
import { DetectionValues, CelebrityConcepts } from "../interfaces";

interface Props {
  detectedValues: DetectionValues[];
}

const CelebrityConceptsList: React.FC<Props> = ({ detectedValues }) => {
  return (
    <>
      {detectedValues.map((detectedPerson: DetectionValues, index: number) => (
        <Accordion
          defaultActiveKey="1"
          key={index}
          className="mb-3"
          style={{ width: "450px" }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Person #{index + 1}</Accordion.Header>
            <Accordion.Body>
              <ListGroup as="ul" numbered>
                {detectedPerson.celebrityConcepts.map(
                  (celebrity: CelebrityConcepts) => (
                    <ListGroupItem
                      topLists={false}
                      data={celebrity}
                      key={celebrity.id}
                    />
                  )
                )}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
};

export default CelebrityConceptsList;
