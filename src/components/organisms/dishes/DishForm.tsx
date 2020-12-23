import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import { DraftDish, Genre } from '../../../interfaces/domains/dish';
import { MenuCategory } from '../../../interfaces/domains/menu';
import FormAlert from '../../molecules/FormAlert';
import FormInput from '../../molecules/FormInput';
import GenreSelector from '../../molecules/GenreSelector';
import MenuCategorySelector from '../../molecules/MenuCategorySelector';
import { DishContext } from '../../pages/dishes/index';
import { DeviceContext } from '../../pages/Layout';

type ErrorMessages = {
  [key: string]: string[];
};

type Props = {
  onCreate: () => void;
};

const DishForm: React.FC<Props> = (props) => {
  const { onCreate } = props;

  const { isMobile } = useContext(DeviceContext);

  const {
    targetDish, dishDispatch, dishModal, dishModalDispatch,
  } = useContext(DishContext);

  const [draftDish, setDraftDish] = useState<DraftDish>(targetDish);
  const [errors, setErrors] = useState<ErrorMessages[] | null>(null);

  useEffect(() => {
    if (targetDish) setDraftDish(targetDish);
  }, [targetDish]);

  const handleAlertClose = (): void => setErrors(null);

  const handleClose = (): void => {
    dishDispatch({ type: 'reset' });
    dishModalDispatch({ type: 'close' });
    setErrors(null);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    setDraftDish({ ...draftDish, name: event.target.value })
  );

  const handleGenreSelect = (value: Genre): void => (
    setDraftDish({ ...draftDish, genre: value })
  );

  const handleCategorySelect = (value: MenuCategory): void => (
    setDraftDish({ ...draftDish, category: value })
  );

  const formStyle: React.CSSProperties = { padding: isMobile ? '0' : '0 16px' };

  return (
    <Modal show={dishModal.show} centered onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleAlertClose} />
      <Modal.Header closeButton>
        <Modal.Title>DishForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group style={{ ...formStyle }}>
          <Label>Genre</Label>
          <GenreSelector
            onChange={handleGenreSelect}
            selected={targetDish.genre}
          />
        </Form.Group>
        <FormInput
          label="Name"
          value={draftDish.name}
          onChange={handleChange}
        />
        <Form.Group style={{ ...formStyle }}>
          <Label>Category</Label>
          <MenuCategorySelector
            onChange={handleCategorySelect}
            selected={targetDish.category}
          />
        </Form.Group>
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

const Label = styled(Form.Label)({
  display: 'block',
});

export default DishForm;
