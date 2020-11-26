import React, {
  useContext, useState, ReactText, useEffect,
} from 'react';
import {
  Button, Form, InputGroup, Modal,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AiFillMinusCircle } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import styled from 'styled-components';

import ScheduledMenuCategory from '../../enum/scheduled_menu_category';
import { DishItem } from '../../interfaces/domains/dish';
import { DraftMenu } from '../../interfaces/domains/menu';
import { FormProps } from '../../interfaces/domains/utils';
import FormAlert from '../FormAlert';
import RadioSelector from '../RadioSelector';

import { MenusContext } from './CreateForm';

type Props = {
  show: boolean;
  menu?: DraftMenu;
  onHide: () => void;
};

type errorMessages = {
  [key: string]: string[];
};

const MenuItemForm: React.FC<Props> = (props) => {
  const { show, menu, onHide } = props;

  const { dishList } = useContext(MenusContext);
  const { menusDispatch, dishListDispatch } = useContext(MenusContext);

  const [errors, setErrors] = useState<errorMessages | null>(null);

  const initialMenu = {
    id: null,
    index: -1,
    dishId: null,
    dishName: '',
    category: 'main',
    memo: '',
    image: null,
    delete: false,
  };

  const [draftMenu, setDraftMenu] = useState<DraftMenu>(initialMenu);

  useEffect(() => {
    if (menu) setDraftMenu(menu);
  }, [menu]);

  const handleClose = (): void => {
    setDraftMenu(initialMenu);
    onHide();
  };

  const handleCategorySelect = (value: ReactText): void => {
    if (typeof value === 'string') {
      setDraftMenu({ ...draftMenu, category: value });
    }
  };

  const handleDishSelect = (selected: DishItem[]): void => {
    if (selected[0] !== undefined) {
      setDraftMenu({
        ...draftMenu,
        dishId: selected[0].id,
        dishName: selected[0].label,
      });
      dishListDispatch({ type: 'select', value: selected[0].id });
      setErrors(null);
    }
  };

  const handleDishSelectInput = (): void => {
    setDraftMenu({
      ...draftMenu,
      dishId: null,
      dishName: '',
    });
  };

  const selectableDish: DishItem[] = (
    dishList.filter((dish) => (dish.selectable === true))
  );

  const handleMemoInput = (event: React.FormEvent<FormProps>): void => {
    setDraftMenu({ ...draftMenu, memo: event.currentTarget.value });
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files !== null && event.target.files.length > 0) {
      setDraftMenu({ ...draftMenu, image: event.target.files[0] });
    }
  };

  const handleImageDelete = (): void => {
    setDraftMenu({ ...draftMenu, image: null });
  };

  const handleSubmit = (): void => {
    if (draftMenu.dishId !== null) {
      menusDispatch({ type: draftMenu.index > -1 ? 'update' : 'add', index: draftMenu.index, value: draftMenu });
      setDraftMenu(initialMenu);
      onHide();
    } else {
      setErrors({ dishId: ['not selected!'] });
    }
  };

  const selectedDish: DishItem[] = (
    draftMenu.dishId ? [{ id: draftMenu.dishId, label: draftMenu.dishName, selectable: false }] : []
  );

  const ref: React.RefObject<Typeahead<DishItem>> = React.createRef();

  return (
    <MenuModal
      show={show}
      onHide={handleClose}
      centered
    >
      <FormAlert messages={errors} onClose={() => { setErrors(null); }} />
      <ModalContent>
        <Modal.Title>Add Menu</Modal.Title>
        <Modal.Body>
          <Form.Group style={{ marginBottom: 8 }}>
            <Label>Category</Label>
            <RadioSelector
              options={ScheduledMenuCategory}
              onChange={handleCategorySelect}
              selected={draftMenu.category}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: 8 }}>
            <Label>Dish</Label>
            <Typeahead
              ref={ref}
              onChange={handleDishSelect}
              onInputChange={handleDishSelectInput}
              options={selectableDish}
              selected={selectedDish}
              placeholder="Dish"
            />
          </Form.Group>
          <Form.Group>
            <Label>Memo</Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleMemoInput}
              type="text"
              value={draftMenu.memo}
            />
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <Form.Label>Image</Form.Label>
              {
                draftMenu.image === null
                && (
                  <UploadIcon>
                    <label htmlFor={`menu-image-${draftMenu.index.toString()}`}>
                      <BiImageAdd style={{ width: '25px', height: '25px', cursor: 'pointer' }} />
                      <input
                        id={`menu-image-${draftMenu.index.toString()}`}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        hidden
                      />
                    </label>
                  </UploadIcon>
                )
              }
            </InputGroup>
            {
              draftMenu.image
              && (
                <ImageList>
                  <li>{draftMenu.image.name}</li>
                  <DeleteIcon onClick={handleImageDelete}>
                    <AiFillMinusCircle />
                  </DeleteIcon>
                </ImageList>
              )
            }
          </Form.Group>
        </Modal.Body>
        <FormButtons>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <FormButton variant="primary" onClick={handleSubmit}>
            { draftMenu.index > -1 ? 'Update' : 'Add' }
          </FormButton>
        </FormButtons>
      </ModalContent>
    </MenuModal>
  );
};

const MenuModal = styled(Modal)({
  backgroundColor: 'rgba(52, 58, 64, 0.7)',
});

const ModalContent = styled.div({
  padding: 16,
});

const Label = styled(Form.Label)({
  display: 'block',
});

const UploadIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: '#509aea',
  cursor: 'pointer',
});

const ImageList = styled.div({
  display: 'flex',
  fontSize: 14,
});

const DeleteIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: '#dc3545',
  cursor: 'pointer',
});

const FormButtons = styled.div({
  display: 'flex',
  paddingRight: 16,
  justifyContent: 'flex-end',
});

const FormButton = styled(Button)({
  marginLeft: 8,
});

export default MenuItemForm;
