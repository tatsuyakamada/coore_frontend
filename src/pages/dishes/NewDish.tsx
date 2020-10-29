import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, InputGroup, Form, FormControl, Alert,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ContentHeader from '../../components/ContentHeader';

type draftDish = {
  name: string;
  genre: string;
};

type errorMessages = {
  [key: string]: string[];
}

const NewDish: React.FC = () => {
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState<errorMessages | null>(null);
  const [dish, setDish] = useState<draftDish>({ name: '', genre: 'japanese' });

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/dishes" />;
    }
    return undefined;
  };
  const createDish = () => {
    axios.post('http://localhost:3100/api/v1/dishes', {
      dish,
    })
      .then(() => {
        setRedirect(true);
        renderRedirect();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.messages);
      });
  };

  const handleChange = (event: any) => {
    setDish({ name: event.target.value, genre: dish.genre });
  };

  const handleSelect = (event: any) => {
    setDish({ name: dish.name, genre: event.target.value });
  };

  const showAlert = (messages: errorMessages | null) => {
    if (messages) {
      return (
        <Alert variant="danger" onClose={() => { setErrorMessage(null); }} dismissible>
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
      );
    }

    return undefined;
  };

  return (
    <div>
      {renderRedirect()}
      {showAlert(errorMessage)}
      <ContentHeader title="New Dish" />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="name">name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="name"
          alia-label="name"
          aria-describedby="name"
          onChange={handleChange}
        />
        <Form.Control as="select" onChange={handleSelect}>
          <option value="japanese">和食</option>
          <option value="western">洋食</option>
          <option value="chinese">中華</option>
          <option value="other">その他</option>
        </Form.Control>
      </InputGroup>
      <Buttons>
        <Button onClick={createDish}>Create</Button>
      </Buttons>
    </div>
  );
};

const Buttons = styled.div({
  marginTop: 20,
  textAlign: 'right',
});

export default NewDish;
