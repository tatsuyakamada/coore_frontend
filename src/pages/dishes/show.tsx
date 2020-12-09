import axios from 'axios';
import React, {
  createContext, useState, useEffect, useReducer, useContext,
} from 'react';
import { DayValue, DayRange } from 'react-modern-calendar-datepicker';
import { useMediaQuery } from 'react-responsive';
import { useParams, useHistory } from 'react-router';
import styled from 'styled-components';

import GenreBadge from '../../components/atoms/GenreBadge';
import SearchButton from '../../components/atoms/SeachIcon';
import FormedImage from '../../components/molecules/FormedImage';
import ImageModal from '../../components/molecules/ImageModal';
import ContentSubHeader from '../../components/organisms/ContentSubHeader';
import ScheduleList from '../../components/organisms/schedules/ScheduleList';
import ScheduleSearchBar from '../../components/organisms/schedules/ScheduleSearchBar';
import ScheduleSearchModal from '../../components/organisms/schedules/ScheduleSearchModal';
import { Dish } from '../../interfaces/domains/dish';
import { Image } from '../../interfaces/domains/image';
import { ScheduledMenu, DraftSchedule, ScheduleCategory } from '../../interfaces/domains/schedule';
import {
  initialSchedule, scheduleReducer, ScheduleAction,
} from '../../reducers/schedule/scheduleForm';
import { initialCondition, SearchCondition, scheduleSearchReducer } from '../../reducers/schedule/search';
import mobile from '../../utils/responsive';
import { ErrorContext } from '../Layout';

export const ScheduledMenuContext = createContext({} as {
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
  searchCondition: SearchCondition
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
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<Image | null>(null);

  const { id } = useParams<{ id: string }>();

  const isMobile = useMediaQuery(mobile);

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

  const filteredSchedules = (): ScheduledMenu[] => (
    scheduledMenus.filter((scheduledMenu) => (
      categories.includes(scheduledMenu.schedule.category)
      && inDateRange(scheduledMenu.schedule.date)
    ))
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

  const dateFromDayValue = (day: DayValue): Date | null => (
    day ? new Date(day.year, day.month - 1, day.day) : null
  );

  const handleSearch = (): void => (
    searchConditionDispatch({ type: 'open' })
  );

  const handleClose = (): void => (
    searchConditionDispatch({ type: 'close' })
  );

  const handleReset = (): void => (
    searchConditionDispatch({ type: 'reset' })
  );

  const handleCategorySelect = (category: ScheduleCategory): void => (
    searchConditionDispatch({ type: 'category', category })
  );

  const handleDayRangeSelect = (selected: DayRange): void => (
    searchConditionDispatch({ type: 'dayRange', dayRange: selected })
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
                    <ImageCard onClick={() => handleImageClick(img)}>
                      <FormedImage image={img} style={{ maxHeight: 200, maxWidth: 280 }} />
                    </ImageCard>
                  ))
                }
              </ImageCards>
            </Images>
            <ScheduledMenuContext.Provider value={{ schedule, scheduleDispatch, searchCondition }}>
              <History>
                <ContentSubHeader subtitle="History">
                  {isMobile && <SearchButton onClick={handleSearch} />}
                </ContentSubHeader>
                <>
                  {
                    isMobile
                      ? (
                        <ScheduleSearchModal
                          show={searchCondition.show}
                          categories={searchCondition.categories}
                          dayRange={searchCondition.dayRange}
                          onClick={handleCategorySelect}
                          onSelect={handleDayRangeSelect}
                          onClose={handleClose}
                          onReset={handleReset}
                        />
                      )
                      : (
                        <ScheduleSearchBar
                          categories={searchCondition.categories}
                          dayRange={searchCondition.dayRange}
                          onClick={handleCategorySelect}
                          onSelect={handleDayRangeSelect}
                        />
                      )
                  }
                </>
                <ScheduleList scheduledMenus={filteredSchedules()} />
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
