import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { DraftCategory } from '../../../interfaces/domains/stuff';
import FormAlert from '../../molecules/FormAlert';
import FormInput from '../../molecules/FormInput';
import { StuffContext } from '../../pages/stuffs/index';

type ErrorMessages = {
  [key: string]: string[];
};

type Props = {
  onCreate: () => void;
}

const CategoryForm: React.FC<Props> = (props) => {
  const { onCreate } = props;

  const {
    targetCategory, categoryDispatch, categoryModal, categoryModalDispatch,
  } = useContext(StuffContext);

  const [draftCategory, setDraftCategory] = useState<DraftCategory>(targetCategory);
  const [errors, setErrors] = useState<ErrorMessages[] | null>(null);

  useEffect(() => {
    if (targetCategory) setDraftCategory(targetCategory);
  }, [targetCategory]);

  const handleClose = () => {
    categoryDispatch({ type: 'reset' });
    categoryModalDispatch({ type: 'close' });
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
        .then(() => {
          onCreate();
          handleClose();
        })
        .catch((error) => {
          setErrors(error.response.data.messages);
        });
    }
  };

  return (
    <Modal show={categoryModal.show} centerd onHide={handleClose}>
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          { draftCategory.id ? 'Update' : 'Save' }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryForm;
