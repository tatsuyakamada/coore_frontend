import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import React, {
  useEffect, useReducer, useState, createContext,
} from 'react';
import { DayValue, DayRange } from 'react-modern-calendar-datepicker';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import AddButton from '../../components/atoms/AddButton';
import SearchButton from '../../components/atoms/SeachIcon';
import ContentHeader from '../../components/organisms/ContentHeader';
import ScheduledMenuForm from '../../components/organisms/schedules/ScheduledMenuForm';
import ScheduleList from '../../components/organisms/schedules/ScheduleList';
import ScheduleSearchBar from '../../components/organisms/schedules/ScheduleSearchBar';
import ScheduleSearchModal from '../../components/organisms/schedules/ScheduleSearchModal';
import { DraftMenu } from '../../interfaces/domains/menu';
import { DraftSchedule, ScheduleCategory, ScheduledMenu } from '../../interfaces/domains/schedule';
import { MenusAction, menusReducer } from '../../reducers/menu';
import { ScheduledMenusAction, scheduledmenusReducer } from '../../reducers/schedule/scheduledMenus';
import {
  scheduleReducer, initialSchedule, scheduleModalReducer,
  ScheduleModal, ScheduleAction, ScheduleModalAction,
} from '../../reducers/schedule/scheduleForm';
import {
  initialCondition, SearchCondition, SearchAction, scheduleSearchReducer,
} from '../../reducers/schedule/search';
import mobile from '../../utils/responsive';

export const ScheduledMenuContext = createContext({} as {
  scheduledMenus: ScheduledMenu[];
  scheduledMenusDispatch: React.Dispatch<ScheduledMenusAction>;
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
  scheduleModal: ScheduleModal;
  scheduleModalDispatch: React.Dispatch<ScheduleModalAction>;
  menus: DraftMenu[];
  menusDispatch: React.Dispatch<MenusAction>;
  searchCondition: SearchCondition;
  searchConditionDispatch: React.Dispatch<SearchAction>;
});

const IndexSchedule: React.FC = () => {
  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);
  const [scheduledMenus, scheduledMenusDispatch] = useReducer(scheduledmenusReducer, []);
  const [scheduleModal, scheduleModalDispatch] = useReducer(scheduleModalReducer, { show: false });
  const [menus, menusDispatch] = useReducer(menusReducer, []);
  const [
    searchCondition,
    searchConditionDispatch,
  ] = useReducer(scheduleSearchReducer, initialCondition);

  const [reload, setReload] = useState<boolean>(false);

  const isMobile = useMediaQuery(mobile);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/schedules.json')
      .then((results) => {
        scheduledMenusDispatch({ type: 'fetch', value: results.data });
        setReload(false);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [reload]);

  const handleSearch = (): void => (
    searchConditionDispatch({ type: 'open' })
  );

  const handleNew = ():void => {
    scheduleDispatch({ type: 'new' });
    scheduleModalDispatch({ type: 'open' });
  };

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

  const { categories, dayRange } = searchCondition;

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
    <ScheduledMenuContext.Provider value={{
      scheduledMenus,
      scheduledMenusDispatch,
      schedule,
      scheduleDispatch,
      scheduleModal,
      scheduleModalDispatch,
      menus,
      menusDispatch,
      searchCondition,
      searchConditionDispatch,
    }}
    >
      <ScheduledMenuForm onCreate={() => setReload(true)} />
      <ContentHeader title="Schedule">
        <RightContent>
          { isMobile && <SearchButton onClick={handleSearch} /> }
          <AddButton onClick={handleNew} />
        </RightContent>
      </ContentHeader>
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
    </ScheduledMenuContext.Provider>
  );
};

const RightContent = styled.div({
  display: 'flex',
  margin: 'auto',
  width: '100%',
  justifyContent: 'flex-end',
});

export default IndexSchedule;
