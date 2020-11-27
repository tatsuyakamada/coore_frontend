import axios from 'axios';
import React, {
  createContext, useEffect, useState, useReducer,
} from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import AddButton from '../../components/atoms/AddButton';
import ContentHeader from '../../components/organisms/ContentHeader';
import DishForm from '../../components/organisms/dishes/DishForm';
import DishList from '../../components/organisms/dishes/DishList';
import { Dish } from '../../interfaces/domains/dish';
import { DishesAction, dishesReducer } from '../../reducers/dish/dishes';
import {
  DishFormAction, DishFormProps, dishReducer, initialDishFormProps,
} from '../../reducers/dish/dishForm';

export const DishContext = createContext({} as {
  dishes: Dish[];
  dishesDispatch: React.Dispatch<DishesAction>
  dishForm: DishFormProps;
  dishFormDispatch: React.Dispatch<DishFormAction>;
});

const IndexDish: React.FC = () => {
  const [dishes, dishesDispatch] = useReducer(dishesReducer, []);
  const [dishForm, dishFormDispatch] = useReducer(dishReducer, initialDishFormProps);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/dishes.json')
      .then((results) => {
        dishesDispatch({ type: 'fetch', value: results.data });
        setReload(false);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [reload]);

  const handleNew = (): void => (
    dishFormDispatch({ type: 'new', value: { show: true, dish: null } })
  );

  const handleCreate = (): void => (
    setReload(true)
  );

  return (
    <DishContext.Provider
      value={{
        dishes, dishesDispatch, dishForm, dishFormDispatch,
      }}
    >
      <ContentHeader title="Dish">
        <RightContent>
          <AddButton onClick={handleNew} />
        </RightContent>
      </ContentHeader>
      <DishForm onCreate={handleCreate} />
      <DishList />
    </DishContext.Provider>
  );
};

const RightContent = styled.div({
  display: 'flex',
  margin: 'auto',
  textAlign: 'right',
  width: '100%',
  justifyContent: 'flex-end',
});

export default withRouter(IndexDish);
