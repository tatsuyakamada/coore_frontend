import React, { useContext } from 'react';
import { DayValue } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduledMenu } from '../../../interfaces/domains/schedule';
import SearchIcon from '../../atoms/SeachIcon';
import { ScheduledMenuContext } from '../../pages/dishes/show';
import { DeviceContext } from '../../pages/Layout';
import ContentSubHeader from '../ContentSubHeader';
import ScheduleList from '../schedules/ScheduleList';

import ScheduleSearchBar from './ScheduleSearchBar';
import ScheduleSearchModal from './ScheduleSearchModal';

type Props = {
  scheduledMenus: ScheduledMenu[];
};

const DishHistories: React.FC<Props> = (props) => {
  const { scheduledMenus } = props;

  const { isMobile } = useContext(DeviceContext);
  const {
    searchCondition, searchConditionDispatch,
  } = useContext(ScheduledMenuContext);

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
      if (to) return from <= targetDate && targetDate <= to;
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

  const handleSearch = (): void => searchConditionDispatch({ type: 'open' });

  return (
    <History>
      <ContentSubHeader subtitle="History">
        {isMobile && <SearchIcon onClick={handleSearch} />}
      </ContentSubHeader>
      { isMobile ? <ScheduleSearchModal /> : <ScheduleSearchBar />}
      <ScheduleList scheduledMenus={filteredSchedules} columns={isMobile ? 1 : 4} />
    </History>
  );
};

const History = styled.div`
  margin-top: 12px,
`;

export default DishHistories;
