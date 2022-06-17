import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ScoopsResponse } from '../../utils/ScoopsResponse';

interface Props extends ScoopsResponse {
  optionType: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
  inputType: string;
}

const Option = ({
  name,
  imagePath,
  optionType,
  inputType,
  updateItemCount,
}: Props): React.ReactElement<Props> => {
  const [isValid, setIsValid] = useState(true);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType === 'checkbox') {
      updateItemCount(name, e.target.checked ? '1' : '0');
    } else {
      const currentValue = e.target.value;

      // make sure we're using a number and not a string to validate
      const currentValueFloat = parseFloat(currentValue);
      const valueIsValid =
        0 <= currentValueFloat &&
        currentValueFloat <= 10 &&
        Math.floor(currentValueFloat) === currentValueFloat;

      // validate
      setIsValid(valueIsValid);

      // only update context if the value is valid
      if (valueIsValid) updateItemCount(name, currentValue);
    }
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
          {' '}
          {inputType === 'checkbox' ? (
            <Form.Check
              type="checkbox"
              defaultValue={0}
              onChange={onChangeValue}
            />
          ) : (
            <Form.Control
              type="number"
              defaultValue={0}
              onChange={onChangeValue}
              isInvalid={!isValid}
            />
          )}
        </Col>
      </Form.Group>
    </Col>
  );
};

export default Option;
