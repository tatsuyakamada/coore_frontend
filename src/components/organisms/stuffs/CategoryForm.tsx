import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { DraftCategory } from '../../../interfaces/domains/stuff';
import SubmitButton from '../../atoms/SubmitButton';
import FormAlert from '../../molecules/FormAlert';
import FormInput from '../../molecules/FormInput';
import { InfoContext } from '../../pages/Layout';
import { StuffContext } from '../../pages/stuffs/index';

type ErrorMessages = {
  [key: string]: string[];
};

type Props = {
  onCreate: () => void;
}

const CategoryForm: React.FC<Props> = (props) => {
  const { onCreate } = props;

  const { infoDispatch } = useContext(InfoContext);

  const {
    targetCategory, categoryDispatch, stuffRelationModal, stuffRelationModalDispatch,
  } = useContext(StuffContext);

  const [draftCategory, setDraftCategory] = useState<DraftCategory>(targetCategory);
  const [errors, setErrors] = useState<ErrorMessages[] | null>(null);

  useEffect(() => {
    if (targetCategory) setDraftCategory(targetCategory);
  }, [targetCategory]);

  const handleClose = () => {
    categoryDispatch({ type: 'reset' });
    stuffRelationModalDispatch({ type: null });
    setErrors(null);
  };

  const handleAlertClose = (): void => setErrors(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    setDraftCategory({ ...draftCategory, name: event.target.value })
  );

  const validateCategory = (): boolean => {
    if (draftCategory.name === '') setErrors([{ name: ["can't be blank!"] }]);
    return errors === null;
  };

  const handleSubmit = (): void => {
    if (validateCategory()) {
      const baseUrl = 'http://localhost:3100/api/v1/categories';
      const url = draftCategory.id ? baseUrl.concat(`/${draftCategory.id}`) : baseUrl;
      const method = draftCategory.id ? 'put' : 'post';
      const methodMessage = method === 'put' ? '更新' : '登録';

      axios.request({
        method,
        url,
        data: {
          category: {
            id: draftCategory.id,
            name: draftCategory.name,
          },
        },
      })
        .then((response) => {
          infoDispatch({
            type: 'set',
            value: {
              type: 'info',
              status: response.status,
              message: `${response.data.name}を${methodMessage}しました`,
            },
          });
          onCreate();
          handleClose();
        })
        .catch((error) => {
          setErrors(error.response.data.messages);
        });
    }
  };

  return (
    <Modal show={stuffRelationModal.type === 'category'} centered onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleAlertClose} />
      <Modal.Header closeButton>
        <Modal.Title>CategoryForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInput
          label="Name"
          value={draftCategory.name}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton id={draftCategory.id} onClick={handleSubmit} />
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryForm;
