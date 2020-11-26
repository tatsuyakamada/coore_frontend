import axios from 'axios';
import React, { useState } from 'react';
import {
  Button, Form, FormControl, InputGroup, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { DraftDish, Genre } from '../../../interfaces/domains/dish';
import FormAlert from '../../molecules/FormAlert';
import GenreSelector from '../../molecules/GenreSelector';

type Props = {
  show: boolean;
  onClose: () => void;
  onCreate: () => void;
};

type errorMessages = {
  [key: string]: string[];
};

const CreateForm: React.FC<Props> = (props) => {
  const { show, onClose, onCreate } = props;
  const [dish, setDish] = useState<DraftDish>({ name: '', genre: 'japanese' });
  const [errors, setErrors] = useState<errorMessages | null>(null);

  const handleClose = (): void => {
    setErrors(null);
    onClose();
  };

  const createDish = (): void => {
    axios.post('http://localhost:3100/api/v1/dishes', {
      dish,
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
    setDish({ name: event.target.value, genre: dish.genre });
  };

  const handleSelect = (value: Genre): void => {
    setDish({ name: dish.name, genre: value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleClose} />
      <Modal.Header closeButton>
        <Modal.Title>CreateForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormItem>
          <Label>Genre</Label>
          <GenreSelector
            onChange={handleSelect}
            selected={dish.genre}
          />
        </FormItem>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="name">Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="name"
            alia-label="name"
            aria-describedby="name"
            onChange={handleChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={createDish}>
          Save
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

export default CreateForm;
