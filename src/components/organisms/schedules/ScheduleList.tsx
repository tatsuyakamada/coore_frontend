import React, { useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import DatePicker, { DayValue, DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduleCategory, ScheduledMenu } from '../../../interfaces/domains/schedule';
import mappedItem from '../../../utils/mappedItem';
import MultiScheduleCategorySelector from '../../molecules/MultiScheduleCategorySelector';
import ScheduleCard from '../../molecules/ScheduleCard';
import SearchBar from '../../molecules/SearchBar';

type Props = {
  scheduledMenus: ScheduledMenu[];
  columns?: number;
};

const ScheduleList: React.FC<Props> = (props) => {
  const { scheduledMenus, columns } = props;

  const defaultCategories: ScheduleCategory[] = ['dinner', 'lunch', 'morning', 'brunch'];
  const [selectedCategory, setSelectedCategory] = useState<ScheduleCategory[]>(defaultCategories);
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null,
  });

  const filteredSchedules = (): ScheduledMenu[] => (
    scheduledMenus.filter((scheduledMenu) => (
      selectedCategory.includes(scheduledMenu.schedule.category)
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

  type RefProps = {
    ref: React.RefObject<HTMLElement>;
  };

  const handleClick = (category: ScheduleCategory): void => {
    const newSelectedCategory = selectedCategory;
    if (selectedCategory.includes(category)) {
      setSelectedCategory(newSelectedCategory.filter((selected) => (selected !== category)));
    } else {
      setSelectedCategory(newSelectedCategory.concat(category));
    }
  };

  const dateFromDayValue = (day: DayValue): Date | null => (
    day ? new Date(day.year, day.month - 1, day.day) : null
  );

  const stringifyDateRange = (): string => {
    const from = dateFromDayValue(dayRange.from);
    const to = dateFromDayValue(dayRange.to);
    return `${from ? from.toLocaleDateString() : ''} ${from ? '~' : ''} ${to ? to.toLocaleDateString() : ''}`;
  };

  const handleDayRangeSelect = (selected: DayRange): void => {
    if (selected.from) setDayRange(selected);
  };

  const renderCustomInput = ({ ref }: RefProps): React.ReactElement => (
    <DayRangeSelect>
      <Form.Group>
        <DayLabel>Date</DayLabel>
        <DateSelector
          ref={ref}
          value={stringifyDateRange()}
          maximumdate={30}
          readOnly
          style={{ backgroundColor: 'white' }}
        />
      </Form.Group>
    </DayRangeSelect>
  );

  return (
    <>
      <SearchBar>
        <MultiScheduleCategorySelector onClick={handleClick} />
        <DatePicker
          value={dayRange}
          onChange={handleDayRangeSelect}
          renderInput={renderCustomInput} // render a custom input
          shouldHighlightWeekends
        />
      </SearchBar>
      {
        mappedItem<ScheduledMenu>(filteredSchedules(), columns || 4).map((mappedSchedules) => (
          <Row>
            {
              mappedSchedules.map((scheduledMenu) => (
                <Col className="col-3">
                  <ScheduleCard
                    key={scheduledMenu.schedule.id}
                    scheduledMenu={scheduledMenu}
                  />
                </Col>
              ))
            }
          </Row>
        ))
      }
    </>
  );
};

const DayRangeSelect = styled.div({
  display: 'flex',
  marginTop: -12,
  marginLeft: 30,
});

const DayLabel = styled(Form.Label)({
  fontSize: 12,
  margin: 0,
});

const DateSelector = styled(Form.Control)({
  width: 200,
  fontSize: 14,
  textAlign: 'center',
});

export default ScheduleList;
