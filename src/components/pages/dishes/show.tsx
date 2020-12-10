import axios from 'axios';
import React, {
  createContext, useState, useEffect, useReducer, useContext,
} from 'react';
import { DayValue } from 'react-modern-calendar-datepicker';
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
import SearchButton from '../../atoms/SeachIcon';
import FormedImage from '../../molecules/FormedImage';
import ImageModal from '../../molecules/ImageModal';
import ContentSubHeader from '../../organisms/ContentSubHeader';
import ScheduleSearchBar from '../../organisms/dishes/ScheduleSearchBar';
import ScheduleSearchModal from '../../organisms/dishes/ScheduleSearchModal';
import ScheduleList from '../../organisms/schedules/ScheduleList';
import { DeviceContext, ErrorContext } from '../Layout';

export const ScheduledMenuContext = createContext({} as {
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
  searchCondition: SearchCondition;
  searchConditionDispatch: React.Dispatch<SearchAction>;
});

const ShowDish: React.FC = () => {
  const { errorDispatch } = useContext(ErrorContext);
  const { isMobile } = useContext(DeviceContext);

  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);
  const [
    searchCondition, searchConditionDispatch,
  ] = useReducer(scheduleSearchReducer, initialCondition);

  const history = useHistory();

  const [dish, setDish] = useState<Dish | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [scheduledMenus, setScheduledMenus] = useState<ScheduledMenu[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<Image | null>(null);

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

  const handleImageClick = (targetImage: Image): void => {
    setImage(targetImage);
    setShow(true);
  };

  const handleHide = (): void => (
    setShow(false)
  );

  const { categories, dayRange } = searchCondition;

  const dateFromDayValue = (day: DayValue): Date | null => (
    day ? new Date(day.year, day.month - 1, day.day) : null
  );

  const inDateRange = (scheduleDate: Date): boolean => {
    const date = new Date(scheduleDate);
    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const from = dateFromDayValue(dayRange.from);
    const to = dateFromDayValue(dayRange.to);
    if (from === null && to === null) return true;
    if (from) {
      if (to) {
        return from <= targetDate && targetDate <= to;
      }
      return from <= targetDate;
    }
    return true;
  };

  const filteredSchedules: ScheduledMenu[] = (
    scheduledMenus.filter((scheduledMenu) => (
      categories.includes(scheduledMenu.schedule.category)
      && inDateRange(scheduledMenu.schedule.date)
    ))
  );

  const handleSearch = (): void => (
    searchConditionDispatch({ type: 'open' })
  );

  return (
    <>
      {
        dish && (
          <>
            <ImageModal show={show} image={image} onHide={handleHide} />
            <DishLabel>
              <GenreBadge
                genre={(dish && dish.genre) || 'japanese'}
                style={{ height: 30, width: 120, fontSize: 18 }}
              />
              <Name>{dish.name}</Name>
            </DishLabel>
            <Images>
              <ContentSubHeader subtitle="Images" />
              <ImageCards>
                {
                  images.map((img) => (
                    <ImageCard key={img.id} onClick={() => handleImageClick(img)}>
                      <FormedImage
                        image={img}
                        style={{ maxHeight: 200, maxWidth: 280 }}
                      />
                    </ImageCard>
                  ))
                }
              </ImageCards>
            </Images>
            <ScheduledMenuContext.Provider
              value={{
                schedule,
                scheduleDispatch,
                searchCondition,
                searchConditionDispatch,
              }}
            >
              <History>
                <ContentSubHeader subtitle="History">
                  {isMobile && <SearchButton onClick={handleSearch} />}
                </ContentSubHeader>
                { isMobile ? <ScheduleSearchModal /> : <ScheduleSearchBar />}
                <ScheduleList scheduledMenus={filteredSchedules} columns={isMobile ? 1 : 4} />
              </History>
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

const Images = styled.div({
  marginTop: 12,
});

const ImageCards = styled.div({
  display: 'flex',
});

const ImageCard = styled.div({
  display: 'flex',
  margin: 8,
  justifyContent: 'center',
  alignItems: 'center',
});

const History = styled.div({
  marginTop: 12,
});

export default ShowDish;
