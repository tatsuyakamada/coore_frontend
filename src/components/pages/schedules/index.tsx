import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import React, {
  useEffect, useReducer, useState, createContext, useContext,
} from 'react';
import { DayValue } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { DraftMenu } from '../../../interfaces/domains/menu';
import { DraftSchedule, ScheduledMenu } from '../../../interfaces/domains/schedule';
import { MenusAction, menusReducer } from '../../../reducers/menu';
import {
  scheduleReducer, initialSchedule, scheduleModalReducer,
  ScheduleModal, ScheduleAction, ScheduleModalAction,
} from '../../../reducers/schedule/scheduleForm';
import {
  initialCondition, SearchCondition, SearchAction, scheduleSearchReducer,
} from '../../../reducers/schedule/search';
import AddButton from '../../atoms/AddButton';
import SearchButton from '../../atoms/SeachIcon';
import ContentHeader from '../../organisms/ContentHeader';
import ScheduledMenuForm from '../../organisms/schedules/forms/ScheduledMenuForm';
import ScheduleList from '../../organisms/schedules/ScheduleList';
import ScheduleSearchBar from '../../organisms/schedules/ScheduleSearchBar';
import ScheduleSearchModal from '../../organisms/schedules/ScheduleSearchModal';
import { DeviceContext, ErrorContext } from '../Layout';

export const ScheduledMenuContext = createContext({} as {
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
  const { errorDispatch } = useContext(ErrorContext);
  const { isMobile } = useContext(DeviceContext);

  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);
  const [scheduleModal, scheduleModalDispatch] = useReducer(scheduleModalReducer, { show: false });
  const [menus, menusDispatch] = useReducer(menusReducer, []);
  const [
    searchCondition,
    searchConditionDispatch,
  ] = useReducer(scheduleSearchReducer, initialCondition);

  const [scheduledMenus, setScheduledMenus] = useState<ScheduledMenu[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/schedules.json')
      .then((results) => {
        setScheduledMenus(results.data);
        setReload(false);
      })
      .catch((error) => {
        errorDispatch({ type: 'set', value: error.response.data });
      });
  }, [reload]);

  const handleCreate = (): void => setReload(true);

  const handleSearch = (): void => searchConditionDispatch({ type: 'open' });

  const handleNew = ():void => {
    scheduleDispatch({ type: 'new' });
    scheduleModalDispatch({ type: 'open' });
  };

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
      if (to) return from <= targetDate && targetDate <= to;
      return from <= targetDate;
    }
    return true;
  };

  const dateFromDayValue = (day: DayValue): Date | null => (
    day ? new Date(day.year, day.month - 1, day.day) : null
  );

  return (
    <ScheduledMenuContext.Provider value={{
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
      <ScheduledMenuForm onCreate={handleCreate} />
      <ContentHeader title="Schedule">
        <RightContent>
          { isMobile && <SearchButton onClick={handleSearch} /> }
          <AddButton onClick={handleNew} />
        </RightContent>
      </ContentHeader>
      { isMobile ? <ScheduleSearchModal /> : <ScheduleSearchBar />}
      <ScheduleList scheduledMenus={filteredSchedules()} columns={isMobile ? 1 : 4} />
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
