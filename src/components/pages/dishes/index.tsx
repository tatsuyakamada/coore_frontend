import axios from 'axios';
import React, {
  createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import { Dish, DraftDish } from '../../../interfaces/domains/dish';
import {
  DishAction, DishModal, DishModalAction, dishModalReducer, dishReducer, initialDish,
} from '../../../reducers/dish/dishForm';
import {
  SearchAction, SearchCondition, dishSearchReducer, initialCondition,
} from '../../../reducers/dish/search';
import {
  initialCondition as ScheduleInitialCondition,
  SearchAction as ScheduleSearchAction,
  SearchCondition as ScheduleSearchCondition,
  scheduleSearchReducer,
} from '../../../reducers/schedule/search';
import Url from '../../../utils/api';
import AddButton from '../../atoms/AddButton';
import SearchButton from '../../atoms/SeachIcon';
import ContentHeader from '../../organisms/ContentHeader';
import DishList from '../../organisms/dishes/DishList';
import DishSearchBar from '../../organisms/dishes/DishSearchBar';
import DishSearchModal from '../../organisms/dishes/DishSearchModal';
import DishStuffForm from '../../organisms/dishes/DishStuffForm';
import { DeviceContext, InfoContext } from '../Layout';

export const DishContext = createContext({} as {
  targetDish: DraftDish;
  dishDispatch: React.Dispatch<DishAction>;
  dishModal: DishModal;
  dishModalDispatch: React.Dispatch<DishModalAction>;
  searchCondition: SearchCondition;
  searchConditionDispatch: React.Dispatch<SearchAction>;
  scheduleSearchCondition: ScheduleSearchCondition;
  scheduleSearchConditionDispatch: React.Dispatch<ScheduleSearchAction>;
});

const IndexDish: React.FC = () => {
  const { isMobile } = useContext(DeviceContext);
  const { infoDispatch } = useContext(InfoContext);

  const [targetDish, dishDispatch] = useReducer(dishReducer, initialDish);
  const [dishModal, dishModalDispatch] = useReducer(dishModalReducer, { show: false });
  const [
    searchCondition,
    searchConditionDispatch,
  ] = useReducer(dishSearchReducer, initialCondition);
  const [
    scheduleSearchCondition,
    scheduleSearchConditionDispatch,
  ] = useReducer(scheduleSearchReducer, ScheduleInitialCondition);

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios.get(Url('dishes.json'))
      .then((results) => {
        setDishes(results.data);
        setReload(false);
      })
      .catch((error) => {
        infoDispatch({ type: 'set', value: error.response.data });
      });
  }, [reload]);

  const handleSearch = (): void => searchConditionDispatch({ type: 'open' });

  const handleNew = (): void => {
    dishDispatch({ type: 'new' });
    dishModalDispatch({ type: 'open' });
  };

  const handleCreate = (): void => setReload(true);

  const { genres, categories, words } = searchCondition;

  const filteredDishes: Dish[] = (
    dishes.filter((dish) => (
      genres.includes(dish.genre)
      && categories.includes(dish.category)
      && (words ? dish.name.indexOf(words) > -1 : true)
    ))
  );

  return (
    <DishContext.Provider
      value={{
        targetDish,
        dishDispatch,
        dishModal,
        dishModalDispatch,
        searchCondition,
        searchConditionDispatch,
        scheduleSearchCondition,
        scheduleSearchConditionDispatch,
      }}
    >
      <ContentHeader title="Dish">
        <RightContent>
          { isMobile && <SearchButton onClick={handleSearch} /> }
          <AddButton onClick={handleNew} />
        </RightContent>
      </ContentHeader>
      <DishStuffForm onCreate={handleCreate} />
      {isMobile ? <DishSearchModal /> : <DishSearchBar />}
      <DishList
        dishes={filteredDishes}
        columns={isMobile ? 1 : 4}
      />
    </DishContext.Provider>
  );
};

const RightContent = styled.div`
  display: flex;
  margin: auto;
  text-align: right;
  width: 100%;
  justify-content: flex-end;
`;

export default withRouter(IndexDish);
