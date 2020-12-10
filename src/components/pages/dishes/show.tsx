import axios from 'axios';
import React, {
  createContext, useState, useEffect, useReducer, useContext,
} from 'react';
import { useParams, useHistory } from 'react-router';
import styled from 'styled-components';

import { Dish } from '../../../interfaces/domains/dish';
import { Image } from '../../../interfaces/domains/image';
import { ScheduledMenu, DraftSchedule } from '../../../interfaces/domains/schedule';
import {
  initialSchedule, scheduleReducer, ScheduleAction,
} from '../../../reducers/schedule/scheduleForm';
import {
  initialCondition, SearchCondition, scheduleSearchReducer, SearchAction,
} from '../../../reducers/schedule/search';
import GenreBadge from '../../atoms/GenreBadge';
import MenuBadge from '../../atoms/MenuBadge';
import DishHistories from '../../organisms/dishes/DishHistories';
import DishImages from '../../organisms/dishes/DishImages';
import { ErrorContext } from '../Layout';

export const ScheduledMenuContext = createContext({} as {
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
  searchCondition: SearchCondition;
  searchConditionDispatch: React.Dispatch<SearchAction>;
});

const ShowDish: React.FC = () => {
  const { errorDispatch } = useContext(ErrorContext);

  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);
  const [
    searchCondition, searchConditionDispatch,
  ] = useReducer(scheduleSearchReducer, initialCondition);

  const history = useHistory();

  const [dish, setDish] = useState<Dish | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [scheduledMenus, setScheduledMenus] = useState<ScheduledMenu[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`http://localhost:3100/api/v1/dishes/${id}.json`)
      .then((result) => {
        errorDispatch({ type: 'reset' });
        setDish(result.data.dish);
        setImages(result.data.images);
        setScheduledMenus(result.data.schedules);
      })
      .catch((error) => {
        errorDispatch({ type: 'set', value: error.response.data });
        history.push('/dishes');
      });
  }, [id]);

  return (
    <>
      {
        dish && (
          <>
            <DishLabel>
              <GenreBadge
                genre={dish.genre}
                style={{ height: 30, width: 120, fontSize: 18 }}
              />
              <MenuBadge
                category={dish.category}
                style={{
                  marginLeft: 12, height: 30, width: 120, fontSize: 18,
                }}
              />
              <Name>{dish.name}</Name>
            </DishLabel>
            <DishImages images={images} />
            <ScheduledMenuContext.Provider
              value={{
                schedule,
                scheduleDispatch,
                searchCondition,
                searchConditionDispatch,
              }}
            >
              <DishHistories scheduledMenus={scheduledMenus} />
            </ScheduledMenuContext.Provider>
          </>
        )
      }
    </>
  );
};

const DishLabel = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
});

const Name = styled.span({
  marginLeft: 12,
  fontSize: 20,
  fontWeight: 'bold',
});

export default ShowDish;
