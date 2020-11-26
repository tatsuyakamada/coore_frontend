import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { BsFillImageFill } from 'react-icons/bs';
import styled from 'styled-components';

import { DraftMenu } from '../../interfaces/domains/menu';
import MenuItem from '../MenuItem';

import { MenusContext } from './CreateForm';
import MenuItemForm from './MenuItemForm';

const MenusForm: React.FC = () => {
  const { menus, menusDispatch } = useContext(MenusContext);
  const [show, setShow] = useState<boolean>(false);

  const [draftMenu, setDraftMenu] = useState<DraftMenu | null>(null);

  const handleAdd = (): void => {
    setShow(true);
  };

  const handleClose = (): void => {
    setDraftMenu(null);
    setShow(false);
  };

  const handleEdit = (menu: DraftMenu): void => {
    setDraftMenu(menu);
    setShow(true);
  };

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement>, index: number): void => {
    menusDispatch({ type: 'delete', index, value: null });
    const targetMenu: HTMLElement | null = event.currentTarget.closest(`#menu-${index}`);
    if (targetMenu !== null) targetMenu.hidden = true;
  };

  return (
    <MenuForm>
      <MenuFormLabel>
        <div>
          <Form.Label style={{ fontWeight: 'bold' }}>Menu</Form.Label>
        </div>
        <AddButton variant="outline-info" onClick={handleAdd}>
          <AiFillPlusCircle style={{ marginTop: -16 }} />
        </AddButton>
        <MenuItemForm show={show} menu={draftMenu || undefined} onHide={handleClose} />
      </MenuFormLabel>
      {
        menus.map((menu) => (
          <MenuItem
            id={menu.index}
            category={menu.category}
            name={menu.dishName}
          >
            <MenuItemIcons>
              {
                menu.image && <ImageIcon><BsFillImageFill /></ImageIcon>
              }
              <EditIcon onClick={() => handleEdit(menu)}>
                <BiPencil />
              </EditIcon>
              <DeleteIcon onClick={(event) => handleDelete(event, menu.index)}>
                <AiFillMinusCircle />
              </DeleteIcon>
            </MenuItemIcons>
          </MenuItem>
        ))
      }
    </MenuForm>
  );
};

const MenuForm = styled(Form.Group)({
  marginTop: 20,
  width: '90%',
});

const MenuFormLabel = styled.div({
  display: 'flex',
});

const AddButton = styled(Button)({
  marginLeft: 16,
  height: 25,
});

const MenuItemIcons = styled.div({
  display: 'inherit',
  marginLeft: 'auto',
});

const ImageIcon = styled.span({
  color: '#1e71cc',
});

const EditIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: 'green',
  cursor: 'pointer',
});

const DeleteIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: '#dc3545',
  cursor: 'pointer',
});

export default MenusForm;
