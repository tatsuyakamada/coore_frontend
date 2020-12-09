import axios from 'axios';
import React, {
  createContext, useEffect, useState, useReducer,
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import AddButton from '../../components/atoms/AddButton';
import SearchButton from '../../components/atoms/SeachIcon';
import ContentHeader from '../../components/organisms/ContentHeader';
import DishForm from '../../components/organisms/dishes/DishForm';
import DishList from '../../components/organisms/dishes/DishList';
import { Dish, DraftDish } from '../../interfaces/domains/dish';
import { DishesAction, dishesReducer } from '../../reducers/dish/dishes';
import {
  DishAction, dishModalReducer, DishModal, dishReducer, initialDish, DishModalAction,
} from '../../reducers/dish/dishForm';
import {
  dishSearchReducer, initialCondition, SearchCondition, SearchAction,
} from '../../reducers/dish/search';
import mobile from '../../utils/responsive';

export const DishContext = createContext({} as {
  dishes: Dish[];
  dishesDispatch: React.Dispatch<DishesAction>
  dish: DraftDish;
  dishDispatch: React.Dispatch<DishAction>;
  dishModal: DishModal;
  dishModalDispatch: React.Dispatch<DishModalAction>;
  searchCondition: SearchCondition;
  searchConditionDispatch: React.Dispatch<SearchAction>;
});

const IndexDish: React.FC = () => {
  const [dishes, dishesDispatch] = useReducer(dishesReducer, []);
  const [dish, dishDispatch] = useReducer(dishReducer, initialDish);
  const [dishModal, dishModalDispatch] = useReducer(dishModalReducer, { show: false });
  const [
    searchCondition,
    searchConditionDispatch,
  ] = useReducer(dishSearchReducer, initialCondition);

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

  const isMobile = useMediaQuery(mobile);

  const handleSearch = (): void => (
    searchConditionDispatch({ type: 'open' })
  );

  const handleNew = (): void => {
    dishDispatch({ type: 'new' });
    dishModalDispatch({ type: 'open' });
  };

  const handleCreate = (): void => (
    setReload(true)
  );

  return (
    <DishContext.Provider
      value={{
        dishes,
        dishesDispatch,
        dish,
        dishDispatch,
        dishModal,
        dishModalDispatch,
        searchCondition,
        searchConditionDispatch,
      }}
    >
      <ContentHeader title="Dish">
        <RightContent>
          { isMobile && <SearchButton onClick={handleSearch} /> }
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
