import React, {
  useContext, useState, useEffect,
} from 'react';
import {
  Button, Form, InputGroup, Modal,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { BiImageAdd } from 'react-icons/bi';
import styled from 'styled-components';

import { DishItem } from '../../../../interfaces/domains/dish';
import { DraftMenu, MenuCategory } from '../../../../interfaces/domains/menu';
import { FormProps } from '../../../../interfaces/domains/utils';
import DeleteIcon from '../../../atoms/DeleteIcon';
import FormAlert from '../../../molecules/FormAlert';
import MenuCategorySelector from '../../../molecules/MenuCategorySelector';
import { ScheduledMenuContext } from '../../../pages/schedules/index';

import { MenusContext } from './ScheduledMenuForm';

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

  const { menusDispatch } = useContext(ScheduledMenuContext);
  const { dishList, dishListDispatch } = useContext(MenusContext);

  const [errors, setErrors] = useState<errorMessages | null>(null);

  const initialMenu: DraftMenu = {
    id: null,
    index: -1,
    dishId: null,
    dishName: '',
    category: 'main',
    memo: '',
    image: null,
    deleteImage: null,
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

  const handleCategorySelect = (value: MenuCategory): void => (
    setDraftMenu({ ...draftMenu, category: value })
  );

  const handleDishSelect = (selected: DishItem[]): void => {
    if (selected[0] !== undefined) {
      const prevId = draftMenu.dishId;
      setDraftMenu({
        ...draftMenu,
        dishId: selected[0].id,
        dishName: selected[0].label,
      });
      dishListDispatch({ type: 'select', value: selected[0].id, prev: prevId || undefined });
      setErrors(null);
    }
  };

  const handleDishSelectInput = (): void => (
    setDraftMenu({
      ...draftMenu,
      dishId: null,
      dishName: '',
    })
  );

  const selectableDish: DishItem[] = dishList.filter((dish) => (dish.selectable));

  const selectedDish: DishItem[] = (
    draftMenu.dishId ? [{ id: draftMenu.dishId, label: draftMenu.dishName, selectable: false }] : []
  );

  const handleMemoInput = (event: React.FormEvent<FormProps>): void => (
    setDraftMenu({ ...draftMenu, memo: event.currentTarget.value })
  );

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files !== null && event.target.files.length > 0) {
      setDraftMenu({ ...draftMenu, image: event.target.files[0] });
    }
  };

  const handleImageDelete = (): void => setDraftMenu({ ...draftMenu, image: null });

  const handleRegisterdImageDelete = (): void => {
    if (draftMenu.deleteImage) {
      setDraftMenu({
        ...draftMenu, deleteImage: { ...draftMenu.deleteImage, delete: true },
      });
    }
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
            <MenuCategorySelector
              onChange={handleCategorySelect}
              selected={draftMenu.category}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: 8 }}>
            <Label>Dish</Label>
            <Typeahead
              id="dish"
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
                && (draftMenu.deleteImage === null || draftMenu.deleteImage.delete)
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
                  <DeleteIcon onClick={handleImageDelete} />
                </ImageList>
              )
            }
            {
              draftMenu.deleteImage
              && !draftMenu.deleteImage.delete
              && (
                <ImageItem>
                  {draftMenu.deleteImage.name}
                  <DeleteIcon onClick={handleRegisterdImageDelete} />
                </ImageItem>
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

const FormButtons = styled.div({
  display: 'flex',
  paddingRight: 16,
  justifyContent: 'flex-end',
});

const FormButton = styled(Button)({
  marginLeft: 8,
});

const ImageItem = styled.li({
  display: 'flex',
  fontSize: 14,
});

export default MenuItemForm;
