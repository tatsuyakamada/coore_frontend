import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsFillImageFill } from 'react-icons/bs';
import styled from 'styled-components';

import { DraftMenu } from '../../../../interfaces/domains/menu';
import AddButton from '../../../atoms/AddButton';
import DeleteIcon from '../../../atoms/DeleteIcon';
import EditIcon from '../../../atoms/EditIcon';
import MenuItem from '../../../molecules/MenuItem';
import { ScheduledMenuContext } from '../../../pages/schedules';

import MenuItemForm from './MenuItemForm';
import { MenusContext } from './ScheduledMenuForm';

const MenusForm: React.FC = () => {
  const { menus, menusDispatch } = useContext(ScheduledMenuContext);
  const { dishListDispatch } = useContext(MenusContext);

  const [show, setShow] = useState<boolean>(false);
  const [draftMenu, setDraftMenu] = useState<DraftMenu | null>(null);

  const handleAdd = (): void => setShow(true);

  const handleClose = (): void => {
    setDraftMenu(null);
    setShow(false);
  };

  const handleEdit = (menu: DraftMenu): void => {
    setDraftMenu(menu);
    setShow(true);
  };

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement>, menu: DraftMenu): void => {
    menusDispatch({ type: 'delete', index: menu.index, value: null });
    dishListDispatch({ type: 'delete', value: menu.dishId });
    const targetMenu: HTMLElement | null = event.currentTarget.closest(`#menu-${menu.index}`);
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
            key={menu.id}
            id={menu.index}
            category={menu.category}
            name={menu.dishName}
            style={{ padding: '0 16px' }}
          >
            <MenuItemIcons>
              {
                (menu.image || (menu.deleteImage && !menu.deleteImage.delete))
                && (
                  <ImageIcon><BsFillImageFill /></ImageIcon>
                )
              }
              <EditIcon onClick={() => handleEdit(menu)} />
              <DeleteIcon onClick={(event) => handleDelete(event, menu)} />
            </MenuItemIcons>
          </MenuItem>
        ))
      }
    </MenuForm>
  );
};

const MenuForm = styled(Form.Group)`
  margin-top: 20px;
`;

const FormHeader = styled.div`
  display: flex;
`;

const Label = styled(Form.Label)`
  font-weight: bold;
  margin-right: 16px;
`;

const MenuItemIcons = styled.div`
  display: inherit;
  margin-left: auto;
`;

const ImageIcon = styled.span`
  color: #1e71cc;
`;

export default MenusForm;
