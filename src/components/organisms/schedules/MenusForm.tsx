import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsFillImageFill } from 'react-icons/bs';
import styled from 'styled-components';

import { DraftMenu } from '../../../interfaces/domains/menu';
import AddButton from '../../atoms/AddButton';
import DeleteIcon from '../../atoms/DeleteIcon';
import EditIcon from '../../atoms/EditIcon';
import MenuItem from '../../molecules/MenuItem';

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
      <FormHeader>
        <Label>Menu</Label>
        <AddButton onClick={handleAdd} height={25} width={40} />
        <MenuItemForm show={show} menu={draftMenu || undefined} onHide={handleClose} />
      </FormHeader>
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
              <EditIcon onClick={() => handleEdit(menu)} />
              <DeleteIcon onClick={(event) => handleDelete(event, menu.index)} />
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

const FormHeader = styled.div({
  display: 'flex',
});

const Label = styled(Form.Label)({
  fontWeight: 'bold',
  marginRight: 16,
});

const MenuItemIcons = styled.div({
  display: 'inherit',
  marginLeft: 'auto',
});

const ImageIcon = styled.span({
  color: '#1e71cc',
});

export default MenusForm;
