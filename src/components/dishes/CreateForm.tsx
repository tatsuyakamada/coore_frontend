import axios from 'axios';
import React, { useState } from 'react';
import {
  Button, FormControl, InputGroup, Modal,
} from 'react-bootstrap';

import Genre from '../../enum/genre';
import FormAlert from '../FormAlert';
import Selector from '../Selector';

type Props = {
  show: Boolean;
  onClose: () => void;
  onCreate: () => void;
};

type errorMessages = {
  [key: string]: string[];
};

type draftDish = {
  name: string;
  genre: string;
};

const CreateForm: React.FC<Props> = (props) => {
  const { show, onClose, onCreate } = props;
  const [dish, setDish] = useState<draftDish>({ name: '', genre: 'japanese' });
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

  const handleChange = (event: any): void => {
    setDish({ name: event.target.value, genre: dish.genre });
  };

  const handleSelect = (event: any): void => {
    setDish({ name: dish.name, genre: event.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleClose} />
      <Modal.Header closeButton>
        <Modal.Title>CreateForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="genre">Genre</InputGroup.Text>
          </InputGroup.Prepend>
          <Selector options={Genre} onChange={handleSelect} />
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

export default CreateForm;
