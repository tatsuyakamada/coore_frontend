import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import GenreOption from '../../../enum/genre';
import { DraftDish, isGenre } from '../../../interfaces/domains/dish';
import { MenuCategory } from '../../../interfaces/domains/menu';
import Url from '../../../utils/api';
import DeleteButton from '../../atoms/DeleteButton';
import SubmitButton from '../../atoms/SubmitButton';
import FormAlert from '../../molecules/FormAlert';
import FormInput from '../../molecules/FormInput';
import MenuCategorySelector from '../../molecules/MenuCategorySelector';
import ToggleSelector from '../../molecules/ToggleSelector';
import { DishContext } from '../../pages/dishes/index';
import { DeviceContext, InfoContext } from '../../pages/Layout';

type ErrorMessages = {
  [key: string]: string[];
};

type Props = {
  onCreate: () => void;
};

const DishForm: React.FC<Props> = (props) => {
  const { onCreate } = props;

  const { isMobile } = useContext(DeviceContext);
  const { infoDispatch } = useContext(InfoContext);

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
    const paths = draftDish.id ? ['dishes', draftDish.id.toString()] : ['dishes'];
    const method = draftDish.id ? 'put' : 'post';
    const context = method === 'put' ? '更新' : '登録';

    axios.request({
      method,
      url: Url(paths),
      data: { dish: draftDish },
    })
      .then((response) => {
        infoDispatch({
          type: 'set',
          value: {
            type: 'info',
            status: response.status,
            message: `${response.data.name}を${context}しました`,
          },
        });
        onCreate();
        handleClose();
      })
      .catch((error) => {
        const { messages } = error.response.data;
        setErrors([{ Dish: messages }]);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    setDraftDish({ ...draftDish, name: event.target.value })
  );

  const handleGenreSelect = (value: string): void => {
    if (isGenre(value)) setDraftDish({ ...draftDish, genre: value });
  };

  const handleCategorySelect = (value: MenuCategory): void => (
    setDraftDish({ ...draftDish, category: value })
  );

  const handleDelete = (): void => {
    if (!draftDish.id) return;
    axios.delete(Url(['dishes', draftDish.id.toString()]))
      .then((response) => {
        infoDispatch(
          {
            type: 'set',
            value: {
              type: 'info',
              status: response.status,
              message: `${response.data.name}を削除しました`,
            },
          },
        );
        handleClose();
        onCreate();
      })
      .catch((error) => (
        error.response.data.messages.map((message: string) => (
          infoDispatch({
            type: 'set',
            value: {
              type: 'error',
              status: error.response.status,
              message,
            },
          })
        ))
      ));
  };

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
          <ToggleSelector
            options={GenreOption}
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
        <SubmitButton id={draftDish.id} onClick={handleSubmit} />
        {draftDish.id && <DeleteButton onClick={handleDelete} />}
      </Modal.Footer>
    </Modal>
  );
};

const Label = styled(Form.Label)`
  display: block,
`;

export default DishForm;
