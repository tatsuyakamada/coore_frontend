import axios from 'axios';
import React, {
  createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';

import { Genres } from '../../../enum/genre';
import { Dish } from '../../../interfaces/domains/dish';
import { Image } from '../../../interfaces/domains/image';
import { ScheduledMenu } from '../../../interfaces/domains/schedule';
import {
  SearchAction, SearchCondition, initialCondition, scheduleSearchReducer,
} from '../../../reducers/schedule/search';
import Url from '../../../utils/api';
import { GenreColor, MenuCategoryColor } from '../../../utils/colors';
import LabelBadge from '../../atoms/LabelBadge';
import DishHistories from '../../organisms/dishes/DishHistories';
import DishImages from '../../organisms/dishes/DishImages';
import { InfoContext } from '../Layout';

export const ScheduledMenuContext = createContext({} as {
  searchCondition: SearchCondition;
  searchConditionDispatch: React.Dispatch<SearchAction>;
});

const ShowDish: React.FC = () => {
  const { infoDispatch } = useContext(InfoContext);

  const [
    searchCondition, searchConditionDispatch,
  ] = useReducer(scheduleSearchReducer, initialCondition);

  const history = useHistory();

  const [dish, setDish] = useState<Dish | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [scheduledMenus, setScheduledMenus] = useState<ScheduledMenu[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(Url(['dishes', `${id}.json`]))
      .then((result) => {
        infoDispatch({ type: 'reset' });
        setDish(result.data.dish);
        setImages(result.data.images);
        setScheduledMenus(result.data.schedules);
      })
      .catch((error) => {
        infoDispatch({ type: 'set', value: error.response.data });
        history.push('/dishes');
      });
  }, [id]);

  return (
    <>
      {
        dish && (
          <>
            <DishLabel>
              <LabelBadge
                label={Genres[dish.genre]}
                width={55}
                color={GenreColor[dish.genre]}
                style={{ height: 30, width: 120, fontSize: 18 }}
              />
              <LabelBadge
                label={dish.category}
                color={MenuCategoryColor[dish.category]}
                width={65}
                style={{
                  marginLeft: 12, height: 30, width: 120, fontSize: 18,
                }}
              />
              <Name>{dish.name}</Name>
            </DishLabel>
            <DishImages images={images} />
            <ScheduledMenuContext.Provider
              value={{
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

const DishLabel = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Name = styled.span`
  margin-left: 12px;
  font-size: 20px;
  font-weight: bold;
`;

export default ShowDish;
