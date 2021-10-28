import React from "react";
import "./ListGroupItem.css";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { CelebrityConcepts } from "../interfaces";
interface Props {
  data: CelebrityConcepts;
  topLists: boolean;
}

const ListGroupItem: React.FC<Props> = ({ data, topLists }) => {
  return (
    <ListGroup.Item
      key={data.id}
      as="li"
      style={
        topLists ? { width: "450px", marginBottom: "15px" } : { width: "auto" }
      }
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{data.name}</div>
      </div>
      <Badge pill>{data.probability}</Badge>
    </ListGroup.Item>
  );
};

export default ListGroupItem;
