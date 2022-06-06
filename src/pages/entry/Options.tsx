import React, { useEffect, useState } from 'react';
import axios from '../../config/AxiosConfig';
import { ScoopsResponse } from '../../utils/ScoopsResponse';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';

interface Props {
  optionType: string;
}

const Options = ({ optionType }: Props) => {
  const [items, setItems] = useState<ScoopsResponse[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [optionType]);

  return (
    <Row>
      {items.map((item) => (
        <ScoopOption
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  );
};

export default Options;
