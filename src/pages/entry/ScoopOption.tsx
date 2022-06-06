import React from 'react';
import { Col } from 'react-bootstrap';
import { ScoopsResponse } from '../../utils/ScoopsResponse';

type Props = ScoopsResponse;

const ScoopOption = ({ name, imagePath }: Props): React.ReactElement<Props> => {
  return (
    <Col xs={12} sm={6} md={4} className="text-center">
      <img
        src={`http://localhost:3030/${imagePath}`}
        srcSet={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
};

export default ScoopOption;
