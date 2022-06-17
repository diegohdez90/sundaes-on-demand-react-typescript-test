import React, { useState } from 'react';
import { Button, Form, FormLabelProps } from 'react-bootstrap';
import AcceptTermsAndConditions from '../../components/AcceptTermsAndConditions';

const SummaryForm: React.FC<{
  setOrderPhase: (stage: string) => void;
}> = ({ setOrderPhase }: { setOrderPhase: (stage: string) => void }) => {
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);

  const labelProps: FormLabelProps = {};

  const onCheckTermsAndConditions = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAndConditionsChecked(e.target.checked);
  };

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOrderPhase?.('completed');
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          id="terms-and-conditions"
          type="checkbox"
          checked={termsAndConditionsChecked}
          onChange={onCheckTermsAndConditions}
          label={<AcceptTermsAndConditions {...labelProps} />}
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
