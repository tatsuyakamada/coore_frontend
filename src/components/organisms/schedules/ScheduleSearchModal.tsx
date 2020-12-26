import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduleCategoryOptionWithColor } from '../../../enum/schedule_category';
import { isScheduleCategory } from '../../../interfaces/domains/schedule';
import DayRangeSelector from '../../molecules/DayRangeSelector';
import SelectableBadge, { Option } from '../../molecules/SelectableBadge';
import { ScheduledMenuContext } from '../../pages/schedules/index';

const ScheduleSearchModal: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(ScheduledMenuContext);

  const { show, categories, dayRange } = searchCondition;

  const handleClose = () => (
    searchConditionDispatch({ type: 'close' })
  );

  const selected = (category: string): boolean => (
    isScheduleCategory(category) && categories.includes(category)
  );

  const handleClick = (category: string): void => {
    if (isScheduleCategory(category)) searchConditionDispatch({ type: 'category', category });
  };

  const handleSelect = (selectedDayRange: DayRange): void => (
    searchConditionDispatch({ type: 'dayRange', dayRange: selectedDayRange })
  );

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  const CategoryBadge = (option: Option) => (
    <SelectableBadge
      option={option}
      selected={selected(option.value)}
      onClick={handleClick}
      style={{ width: 100, height: 35, borderRadius: 4 }}
    />
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Search</Modal.Header>
      <Modal.Body>
        <BadgeRow>
          {CategoryBadge(ScheduleCategoryOptionWithColor[0])}
          {CategoryBadge(ScheduleCategoryOptionWithColor[1])}
        </BadgeRow>
        <BadgeRow>
          {CategoryBadge(ScheduleCategoryOptionWithColor[2])}
          {CategoryBadge(ScheduleCategoryOptionWithColor[3])}
        </BadgeRow>
        <div>
          <DayRangeSelector
            dayRange={dayRange}
            onSelect={handleSelect}
            style={{ width: '100%' }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleReset}>
          reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const BadgeRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-around;
`;

export default ScheduleSearchModal;
