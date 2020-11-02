import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  messages: errorMessages | null;
  onClose: () => void;
};

type errorMessages = {
  [key: string]: string[];
};

const FormAlert: React.FC<Props> = (props) => {
  const { messages, onClose } = props;

  return (
    <>
      {
        messages
        && (
          <Alert variant="danger" onClose={onClose} dismissible>
            <Alert.Heading>Creation failed!</Alert.Heading>
            {
              Object.keys(messages).map((key) => {
                return (
                  Object.values(messages[key]).map((value) => {
                    return (
                      <p>{`${key}: ${value}`}</p>
                    );
                  })
                );
              })
            }
          </Alert>
        )
      }
    </>
  );
};

export default FormAlert;
