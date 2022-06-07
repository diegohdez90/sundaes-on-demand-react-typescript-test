import React from 'react';
import { Col } from 'react-bootstrap';
import { ScoopsResponse } from '../../utils/ScoopsResponse';

interface Props extends ScoopsResponse {
  optionType: string;
}

const Option = ({
  name,
  imagePath,
  optionType,
}: Props): React.ReactElement<Props> => {
  return (
    <Col xs={12} sm={6} md={4} className="text-center">
      <img
        src={`http://localhost:3030/${imagePath}`}
        srcSet={`http://localhost:3030/${imagePath}`}
        alt={`${name} ${optionType}`}
      />
    </Col>
  );
};

export default Option;
