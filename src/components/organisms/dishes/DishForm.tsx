import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import {
  Button, Form, FormControl, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { DraftDish, Genre } from '../../../interfaces/domains/dish';
import { DishContext } from '../../../pages/dishes';
import FormAlert from '../../molecules/FormAlert';
import GenreSelector from '../../molecules/GenreSelector';

type errorMessages = {
  [key: string]: string[];
};

type Props = {
  onCreate: () => void;
};

const DishForm: React.FC<Props> = (props) => {
  const { onCreate } = props;

  const { dishForm, dishFormDispatch } = useContext(DishContext);
  const [draftDish, setDraftDish] = useState<DraftDish>(dishForm.dish);
  const [errors, setErrors] = useState<errorMessages | null>(null);

  useEffect(() => {
    if (dishForm.dish) setDraftDish(dishForm.dish);
  }, [dishForm]);

  const handleClose = (): void => {
    setErrors(null);
    dishFormDispatch({ type: 'cancel', value: { show: false, dish: null } });
  };

  const handleSubmit = (): void => {
    const baseUrl = 'http://localhost:3100/api/v1/dishes';
    const url = draftDish.id ? baseUrl.concat(`/${draftDish.id}`) : baseUrl;
    const method = draftDish.id ? 'put' : 'post';
    axios.request({
      method,
      url,
      data: { dish: draftDish },
    })
      .then(() => {
        onCreate();
        handleClose();
      })
      .catch((error) => {
        setErrors(error.response.data.messages);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDraftDish({ id: draftDish.id, name: event.target.value, genre: draftDish.genre });
  };

  const handleSelect = (value: Genre): void => {
    setDraftDish({ id: draftDish.id, name: draftDish.name, genre: value });
  };

  return (
    <Modal show={dishForm.show} onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleClose} />
      <Modal.Header closeButton>
        <Modal.Title>DishForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormItem>
          <Label>Genre</Label>
          <GenreSelector
            onChange={handleSelect}
            selected={draftDish.genre}
          />
        </FormItem>
        <FormItem>
          <Label>Name</Label>
          <FormControl
            placeholder="name"
            alia-label="name"
            aria-describedby="name"
            value={draftDish.name}
            onChange={handleChange}
          />
        </FormItem>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          { draftDish.id ? 'Update' : 'Save' }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const FormItem = styled(Form.Group)({
  padding: '0 16px',
});

const Label = styled(Form.Label)({
  display: 'block',
});

export default DishForm;
