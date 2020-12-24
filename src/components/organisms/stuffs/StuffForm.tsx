import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import { DraftStuff, StuffRelations } from '../../../interfaces/domains/stuff';
import DeleteButton from '../../atoms/DeleteButton';
import SubmitButton from '../../atoms/SubmitButton';
import AutoFillSelector, { SelectItem } from '../../molecules/AutoFillSelector';
import FormAlert from '../../molecules/FormAlert';
import FormInput from '../../molecules/FormInput';
import { DeviceContext, InfoContext } from '../../pages/Layout';
import { StuffContext } from '../../pages/stuffs';

type ErrorMessages = {
  [key: string]: string[];
};

type Props = {
  categories: StuffRelations[];
  onCreate: () => void;
}

const StuffForm: React.FC<Props> = (props) => {
  const { categories, onCreate } = props;

  const { isMobile } = useContext(DeviceContext);
  const { infoDispatch } = useContext(InfoContext);

  const {
    targetStuff, stuffDispatch, stuffRelationModal, stuffRelationModalDispatch,
  } = useContext(StuffContext);

  const [draftStuff, setDraftStuff] = useState<DraftStuff>(targetStuff);
  const [errors, setErrors] = useState<ErrorMessages[] | null>(null);

  useEffect(() => {
    if (targetStuff) setDraftStuff(targetStuff);
  }, [targetStuff]);

  const handleClose = () => {
    stuffDispatch({ type: 'reset' });
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
    draftStuff.category ? [draftStuff.category] : []
  );

  const formStyle: React.CSSProperties = { padding: isMobile ? '0' : '0 16px' };

  const categoryRef: React.RefObject<Typeahead<SelectItem>> = React.createRef();

  const handleCategorySelect = (selected: SelectItem[]): void => {
    if (selected[0] !== undefined) {
      setDraftStuff({ ...draftStuff, category: selected[0] });
    }
  };

  const handleCategorySelectInput = (): void => (
    setDraftStuff({ ...draftStuff, category: null, subCategory: null })
  );

  const targetSubCategory = (targetId: number | null): SelectItem[] => {
    const targetCategory = categories.find((category) => (category.id === targetId));
    return targetCategory && targetCategory.childs ? targetCategory.childs : [];
  };

  const selectableSubCategory: SelectItem[] = (
    draftStuff.category ? targetSubCategory(draftStuff.category.id) : []
  );

  const selectedSubCategory: SelectItem[] = (
    draftStuff.subCategory ? [draftStuff.subCategory] : []
  );

  const handleSubCategorySelect = (selected: SelectItem[]): void => (
    setDraftStuff({ ...draftStuff, subCategory: selected[0] })
  );

  const handleSubCategorySelectInput = (): void => (
    setDraftStuff({ ...draftStuff, subCategory: null })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    setDraftStuff({ ...draftStuff, name: event.target.value })
  );

  const validateStuff = (): boolean => {
    const addError = [];
    if (!draftStuff.category) addError.push({ category: ['not selected!'] });
    if (!draftStuff.subCategory) addError.push({ subCategory: ['not selected!'] });
    if (draftStuff.name === '') addError.push({ name: ["can't be blank!"] });
    if (addError.length > 0) setErrors(addError);
    return errors === null;
  };

  const handleSubmit = (): void => {
    if (validateStuff() && draftStuff.subCategory) {
      const baseUrl = 'http://localhost:3100/api/v1/stuffs';
      const url = draftStuff.id ? baseUrl.concat(`/${draftStuff.id}`) : baseUrl;
      const method = draftStuff.id ? 'put' : 'post';
      const methodMessage = method === 'put' ? '更新' : '登録';

      axios.request({
        method,
        url,
        data: {
          stuff: {
            id: draftStuff.id,
            name: draftStuff.name,
            sub_category_id: draftStuff.subCategory.id,
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

  const subCategoryRef: React.RefObject<Typeahead<SelectItem>> = React.createRef();

  const handleDelete = (): void => {
    axios.delete(`http://localhost:3100/api/v1/stuffs/${draftStuff.id}`)
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

  return (
    <Modal show={stuffRelationModal.type === 'stuff'} centered onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleAlertClose} />
      <Modal.Header closeButton>
        <Modal.Title>StuffForm</Modal.Title>
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
        <AutoFillSelector
          label="SubCateogry"
          ref={subCategoryRef}
          onChange={handleSubCategorySelect}
          onInputChange={handleSubCategorySelectInput}
          options={selectableSubCategory}
          selected={selectedSubCategory}
        />
        <FormInput
          label="Name"
          value={draftStuff.name}
          onChange={handleChange}
          style={formStyle}
        />
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton id={draftStuff.id} onClick={handleSubmit} />
        {draftStuff.id && <DeleteButton onClick={handleDelete} />}
      </Modal.Footer>
    </Modal>
  );
};

export default StuffForm;
