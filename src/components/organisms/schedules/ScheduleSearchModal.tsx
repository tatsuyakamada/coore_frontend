import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduleCategory } from '../../../interfaces/domains/schedule';
import SelectableScheduleBadge from '../../atoms/SelectableScheduleBadge';
import DayRangeSelector from '../../molecules/DayRangeSelector';

type Props = {
  show: boolean;
  categories: ScheduleCategory[];
  dayRange: DayRange;
  onClick: (category: ScheduleCategory) => void;
  onSelect: (selected: DayRange) => void;
  onClose: () => void;
  onReset: () => void;
};

const ScheduleSearchModal: React.FC<Props> = (props) => {
  const {
    show, categories, dayRange, onClick, onSelect, onClose, onReset,
  } = props;

  const handleClose = () => (
    onClose()
  );

  const handleReset = () => (
    onReset()
  );

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Header closeButton>Search</Modal.Header>
      <Modal.Body>
        <BadgeRow>
          <SelectableScheduleBadge
            category="dinner"
            categories={categories}
            onClick={onClick}
          />
          <SelectableScheduleBadge
            category="lunch"
            categories={categories}
            onClick={onClick}
          />
        </BadgeRow>
        <BadgeRow>
          <SelectableScheduleBadge
            category="morning"
            categories={categories}
            onClick={onClick}
          />
          <SelectableScheduleBadge
            category="brunch"
            categories={categories}
            onClick={onClick}
          />
        </BadgeRow>
        <div>
          <DayRangeSelector
            dayRange={dayRange}
            onSelect={onSelect}
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
