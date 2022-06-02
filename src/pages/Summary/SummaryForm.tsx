import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AcceptTermsAndConditions from '../../components/AcceptTermsAndConditions';

const SummaryForm: React.FC = () => {
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);

  const onCheckTermsAndConditions = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAndConditionsChecked(e.target.checked);
  };

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={termsAndConditionsChecked}
          onChange={onCheckTermsAndConditions}
          label={<AcceptTermsAndConditions />}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!termsAndConditionsChecked}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
