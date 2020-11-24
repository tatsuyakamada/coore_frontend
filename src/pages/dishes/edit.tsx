import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Button, InputGroup, FormControl, Form,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import ContentHeader from '../../components/ContentHeader';
import { DishHandleAttribute } from '../../interfaces/domains/dish';

type Props = {
  match: {
    params: {
      id: string;
    }
  };
}

const EditDish: React.FC<Props> = (props) => {
  const { match } = props;
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3100/api/v1/dishes/${match.params.id}`)
      .then((result) => {
        setDishAttribute({
          name: result.data.name,
          genre: result.data.genre,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }, []);

  const [dishAttribute, setDishAttribute] = useState<DishHandleAttribute>({ name: '', genre: '' });

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/dishes" />;
    }
    return undefined;
  };

  const updateDish = (): void => {
    axios.patch(`http://localhost:3100/api/v1/dishes/${match.params.id}`, {
      dish: dishAttribute,
    });
  };

  const deleteDish = (): void => {
    axios.delete(`http://localhost:3100/api/v1/dishes/${match.params.id}`)
      .then(() => {
        setRedirect(true);
      });
  };

  const handleChange = (event: any): void => {
    setDishAttribute({
      name: event.target.value,
      genre: dishAttribute.genre,
    });
  };

  const handleSelect = (event: any): void => {
    setDishAttribute(
      {
        name: dishAttribute.name,
        genre: event.target.value,
      },
    );
  };

  return (
    <div>
      {renderRedirect()}
      <ContentHeader title="Edit Dish" />
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="name">name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="name"
          alia-label="name"
          aria-describedby="name"
          onChange={handleChange}
          value={dishAttribute ? dishAttribute.name : ''}
        />
        <Form.Control as="select" onChange={handleSelect} value={dishAttribute ? dishAttribute.genre : 'japanese'}>
          <option value="japanese">和食</option>
          <option value="western">洋食</option>
          <option value="chinese">中華</option>
          <option value="other">その他</option>
        </Form.Control>
      </InputGroup>

      <Buttons>
        <DeleteButton onClick={deleteDish} variant="secondary">Delete</DeleteButton>
        <Button onClick={updateDish}>Update</Button>
      </Buttons>
    </div>
  );
};

const Buttons = styled.div({
  marginTop: 20,
  textAlign: 'right',
});

const DeleteButton = styled(Button)({
  marginRight: 8,
});

export default EditDish;
