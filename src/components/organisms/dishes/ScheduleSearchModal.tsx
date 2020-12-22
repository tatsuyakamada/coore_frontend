import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduleCategory } from '../../../interfaces/domains/schedule';
import SelectableScheduleBadge from '../../atoms/SelectableScheduleBadge';
import DayRangeSelector from '../../molecules/DayRangeSelector';
import { ScheduledMenuContext } from '../../pages/dishes/show';

const ScheduleSearchModal: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(ScheduledMenuContext);

  const { show, categories, dayRange } = searchCondition;

  const handleClose = () => searchConditionDispatch({ type: 'close' });

  const selected = (category: ScheduleCategory): boolean => categories.includes(category);

  const handleClick = (category: ScheduleCategory): void => (
    searchConditionDispatch({ type: 'category', category })
  );

  const handleSelect = (selectedDayRange: DayRange): void => (
    searchConditionDispatch({ type: 'dayRange', dayRange: selectedDayRange })
  );

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Header closeButton>Search</Modal.Header>
      <Modal.Body>
        <BadgeRow>
          <SelectableScheduleBadge
            category="dinner"
            selected={selected('dinner')}
            onClick={handleClick}
          />
          <SelectableScheduleBadge
            category="lunch"
            selected={selected('lunch')}
            onClick={handleClick}
          />
        </BadgeRow>
        <BadgeRow>
          <SelectableScheduleBadge
            category="morning"
            selected={selected('morning')}
            onClick={handleClick}
          />
          <SelectableScheduleBadge
            category="brunch"
            selected={selected('brunch')}
            onClick={handleClick}
          />
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

const BadgeRow = styled.div({
  display: 'flex',
  marginBottom: 16,
  justifyContent: 'space-around',
});

export default ScheduleSearchModal;
