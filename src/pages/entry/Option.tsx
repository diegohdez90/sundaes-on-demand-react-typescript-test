import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ScoopsResponse } from '../../utils/ScoopsResponse';

interface Props extends ScoopsResponse {
  optionType: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
}

const Option = ({
  name,
  imagePath,
  optionType,
  updateItemCount,
}: Props): React.ReactElement<Props> => {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, e.target.value);
  };
  return (
    <Col xs={12} sm={6} md={4} className="text-center">
      <img
        src={`http://localhost:3030/${imagePath}`}
        srcSet={`http://localhost:3030/${imagePath}`}
        alt={`${name} ${optionType}`}
      />
      <Form.Group controlId={`${name}`} as={Row}>
        <Form.Label column xs="6">
          {name}
        </Form.Label>
        <Col xs="5">
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={onChangeValue}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default Option;
