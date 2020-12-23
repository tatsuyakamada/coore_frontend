import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import { DraftSubCategory, StuffRelations } from '../../../interfaces/domains/stuff';
import AutoFillSelector from '../../molecules/AutoFillSelector';
import FormAlert from '../../molecules/FormAlert';
import FormInput from '../../molecules/FormInput';
import { StuffContext } from '../../pages/stuffs/index';

type ErrorMessages = {
  [key: string]: string[];
};

type Props = {
  categories: StuffRelations[];
  onCreate: () => void;
}

type SelectItem = {
  id: number;
  name: string;
}

const SubCategoryForm: React.FC<Props> = (props) => {
  const { categories, onCreate } = props;

  const {
    targetSubCategory, subCategoryDispatch, stuffRelationModal, stuffRelationModalDispatch,
  } = useContext(StuffContext);

  const [draftSubCategory, setDraftSubCategory] = useState<DraftSubCategory>(targetSubCategory);
  const [errors, setErrors] = useState<ErrorMessages[] | null>(null);

  useEffect(() => {
    if (targetSubCategory) setDraftSubCategory(targetSubCategory);
  }, [targetSubCategory]);

  const handleClose = () => {
    subCategoryDispatch({ type: 'reset' });
    stuffRelationModalDispatch({ type: null });
    setErrors(null);
  };

  const handleAlertClose = (): void => setErrors(null);

  const selectableCategories: SelectItem[] = (
    categories.map((category) => (
      { id: category.id, name: category.name }
    ))
  );

  const selectedCategory: SelectItem[] = (
    draftSubCategory.category ? [draftSubCategory.category] : []
  );

  const categoryRef: React.RefObject<Typeahead<SelectItem>> = React.createRef();

  const handleCategorySelect = (selected: SelectItem[]): void => {
    if (selected[0] !== undefined) {
      setDraftSubCategory({ ...draftSubCategory, category: selected[0] });
    }
  };

  const handleCategorySelectInput = (): void => (
    setDraftSubCategory({ ...draftSubCategory, category: null })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    setDraftSubCategory({ ...draftSubCategory, name: event.target.value })
  );

  const validateSubCategory = (): boolean => {
    const addError = [];
    if (!draftSubCategory.category) addError.push({ category: ['not selected!'] });
    if (draftSubCategory.name === '') addError.push({ name: ["can't be blank!"] });
    if (addError.length > 0) setErrors(addError);
    return errors === null;
  };

  const handleSubmit = (): void => {
    if (validateSubCategory() && draftSubCategory.category) {
      const baseUrl = 'http://localhost:3100/api/v1/sub_categories';
      const url = draftSubCategory.id ? baseUrl.concat(`/${draftSubCategory.id}`) : baseUrl;
      const method = draftSubCategory.id ? 'put' : 'post';
      axios.request({
        method,
        url,
        data: {
          sub_category: {
            id: draftSubCategory.id,
            name: draftSubCategory.name,
            category_id: draftSubCategory.category.id,
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
    <Modal show={stuffRelationModal.type === 'sub_category'} centered onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleAlertClose} />
      <Modal.Header closeButton>
        <Modal.Title>SubCategoryForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoFillSelector
          label="Cateogry"
          ref={categoryRef}
          onChange={handleCategorySelect}
          onInputChange={handleCategorySelectInput}
          options={selectableCategories}
          selected={selectedCategory}
        />
        <FormInput
          label="Name"
          value={draftSubCategory.name}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          { draftSubCategory.id ? 'Update' : 'Save' }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubCategoryForm;
