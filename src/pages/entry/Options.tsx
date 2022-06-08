import React, { useEffect, useState } from 'react';
import axios from '../../config/AxiosConfig';
import { ScoopsResponse } from '../../utils/ScoopsResponse';
import Option from './Option';
import { Row } from 'react-bootstrap';
import AlertBanner from '../../components/AlertBanner';
import { prices, STORE_PRICES } from '../../utils/constants';

interface Props {
  optionType: string;
  singular: string;
}

const Options = ({ optionType, singular }: Props) => {
  const [items, setItems] = useState<ScoopsResponse[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        setError(true);
      });
  }, [optionType]);

  return (
    <Row>
      <h3>{`${singular[0].toUpperCase}${singular.slice(1).toLowerCase()}`}</h3>
      {error && <AlertBanner />}
      <p>{prices[optionType as keyof STORE_PRICES]}</p>
      {!error &&
        items.map((item) => (
          <Option
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            optionType={singular}
          />
        ))}
    </Row>
  );
};

export default Options;
