import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import {
  Button, Form, InputGroup,
} from 'react-bootstrap';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import { draftMenu, MenusContext } from './CreateForm';
import Selector from '../Selector';
import ScheduledMenuCategory from '../../enum/scheduled_menu_category';

type Dish = {
  id: number,
  label: string,
  selectable: boolean,
};

const MenusForm: React.FC = () => {
  const { menus, menusDispatch } = useContext(MenusContext);
  const [dishList, setDishList] = useState<Dish[]>([]);

  const handleDishSelect = (selected: any, menu: draftMenu) => {
    if (selected[0] !== undefined) {
      menusDispatch({ type: 'dish_id', index: menu.index, value: selected[0].id });
    }
    reconstructDishList(menu.dishId, false);
  };

  const handleCategorySelect = (event: any, menu: draftMenu) => {
    menusDispatch({ type: 'category', index: menu.index, value: event.target.value });
  };

  const handleImageSelect = (event: any, menu: draftMenu) => {
    menusDispatch({ type: 'image', index: menu.index, value: event.target.files[0] });
  };

  const handleAdd = () => {
    menusDispatch({ type: 'add', index: null });
  };

  const handleDelete = (event: any, menu: draftMenu) => {
    menusDispatch({ type: 'delete', index: menu.index });
    event.target.closest(`#menu-${menu.index}`).hidden = true;
    reconstructDishList(menu.dishId, true);
  };

  const selectableDish: Dish[] = (
    dishList.filter((dish) => { return dish.selectable === true; })
  );

  const reconstructDishList = (targetId: number | null, selectable: boolean): void => {
    const newDishList = dishList;
    newDishList.forEach((dish, index) => {
      if (dish.id === targetId) {
        newDishList[index].selectable = selectable;
      }
    });
    setDishList(newDishList);
  };

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/dishes/dish_list.json')
      .then((results) => {
        setDishList(results.data);
      });
  }, []);

  return (
    <MenuForm>
      <MenuFormLabel>
        <div>
          <Form.Label>Menu</Form.Label>
        </div>
        <AddButton variant="outline-info" onClick={handleAdd}>
          <AiFillPlusCircle style={{ marginTop: -16 }} />
        </AddButton>
      </MenuFormLabel>
      {
        menus.map((menu) => {
          const ref: any = React.createRef();
          return (
            <InputGroup key={menu.index} id={`menu-${menu.index.toString()}`}>
              <InputGroup style={{ width: '25%' }}>
                <Selector
                  options={ScheduledMenuCategory}
                  onChange={(event) => { handleCategorySelect(event, menu); }}
                />
              </InputGroup>
              <Typeahead
                id={menu.index}
                ref={ref}
                onChange={(selected) => { handleDishSelect(selected, menu); }}
                options={selectableDish}
              />
              <FileUploadIcon>
                <label
                  htmlFor={`menu-image-${menu.index.toString()}`}
                  style={{ margin: 0 }}
                >
                  <BiImageAdd style={{ width: '25px', height: '25px' }} />
                  <input
                    type="file"
                    id={`menu-image-${menu.index.toString()}`}
                    accept="image/*"
                    multiple={false}
                    onChange={(event) => { handleImageSelect(event, menu); }}
                    hidden
                  />
                </label>
              </FileUploadIcon>
              <DeleteIcon onClick={(event) => { handleDelete(event, menu); }}>
                <AiFillMinusCircle />
              </DeleteIcon>
            </InputGroup>
          );
        })
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
  marginLeft: 'auto',
  marginRight: 26,
  height: 25,
});

const FileUploadIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: '#509aea',
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
