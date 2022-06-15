import React, { useEffect, useState } from 'react';
import axios from '../../config/AxiosConfig';
import { ScoopsResponse } from '../../utils/ScoopsResponse';
import Option from './Option';
import { Row } from 'react-bootstrap';
import AlertBanner from '../../components/AlertBanner';
import { prices } from '../../utils/constants';
import { useOrderDetails } from '../../context/OrderDetails';

interface Props {
  optionType: string;
  singular: string;
  inputType: string;
}

const Options = ({ optionType, singular, inputType }: Props) => {
  const [items, setItems] = useState<ScoopsResponse[]>([]);
  const [error, setError] = useState(false);
  const [{ totals }, updateItemCount] = useOrderDetails();
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);

  const title = `${optionType[0].toUpperCase()}${optionType
    .slice(1)
    .toLowerCase()}`;
  return (
    <Row>
      <h3>{title}</h3>
      {error && <AlertBanner />}
      <p>{prices[optionType]} each</p>
      <p>{`${title} total: ${totals.get(optionType)}`}</p>
      {!error &&
        items.map((item) => (
          <Option
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            optionType={singular}
            inputType={inputType}
            updateItemCount={(itemName: string, newItemCount: string) => {
              updateItemCount(itemName, newItemCount, optionType);
            }}
          />
        ))}
    </Row>
  );
};

export default Options;
