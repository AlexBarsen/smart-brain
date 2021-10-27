import React from "react";

import "./ImageLinkForm.css";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

interface Props {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSubmit: () => void;
}

const ImageLinkForm: React.FC<Props> = ({ onInputChange, onImageSubmit }) => {
  return (
    <div className="flex-column align-items-center center">
      <h2 className="mb-3">
        This Magic Brain will detect faces in the image you input below
      </h2>

      <InputGroup className="form mb-3">
        <FormControl
          placeholder="Input Image Link"
          aria-label="Input Image Link"
          aria-describedby="basic-addon2"
          onChange={onInputChange}
        />
        <Button variant="primary" onClick={onImageSubmit}>
          Submit Photo
        </Button>
      </InputGroup>
    </div>
  );
};

export default ImageLinkForm;
