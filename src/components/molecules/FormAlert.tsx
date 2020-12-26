import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  messages: errorMessages[] | null;
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
              messages.map((message) => (
                Object.keys(message).map((key) => (
                  Object.values(message[key]).map((value) => (
                    <Message>{`${key}: ${value}`}</Message>
                  ))
                ))
              ))
            }
          </Alert>
        )
      }
    </>
  );
};

const Message = styled.p`
  margin-bottom: 0,
`;

export default FormAlert;
