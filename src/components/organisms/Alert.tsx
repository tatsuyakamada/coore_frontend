import React, { useContext } from 'react';
import { Alert as Component } from 'react-bootstrap';

import { ErrorContext } from '../pages/Layout';

const Alert: React.FC = () => {
  const { errors, errorDispatch } = useContext(ErrorContext);

  const handleClose = (): void => errorDispatch({ type: 'reset' });

  return (
    <>
      {
        errors.length > 0
        && (
          <Component variant="danger" onClose={handleClose} dismissible>
            {
              errors.map((error) => (
                <div id={error.status.toString()}>{`${error.message}`}</div>
              ))
            }
          </Component>
        )
      }
    </>
  );
};

export default Alert;
