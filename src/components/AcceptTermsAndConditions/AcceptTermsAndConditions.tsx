import React from 'react';
import { PopoverProps } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { FormLabelProps } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';

export default function AcceptTermsAndConditions(
  props: FormLabelProps
): React.ReactElement<FormLabelProps> {
  const popoverProps: PopoverProps = {};
  return (
    <React.Fragment {...props}>
      <>
        I agree to
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="right"
          overlay={
            <Popover {...popoverProps}>
              <Popover.Body>
                No ice cream will actually be delivered
              </Popover.Body>
            </Popover>
          }
        >
          <span style={{ color: 'blue' }}> Terms and Conditions</span>
        </OverlayTrigger>
      </>
    </React.Fragment>
  );
}
