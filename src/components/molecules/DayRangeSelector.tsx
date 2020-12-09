import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker, { DayValue, DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

type Props = {
  dayRange: DayRange;
  onSelect: (selected: DayRange) => void;
  style?: React.CSSProperties;
};

const DayRangeSelector: React.FC<Props> = (props) => {
  const { dayRange, onSelect, style } = props;

  type RefProps = {
    ref: React.RefObject<HTMLElement>;
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
    if (selected.from) onSelect(selected);
  };

  const renderCustomInput = ({ ref }: RefProps): React.ReactElement => (
    <DayRangeSelect style={{ ...style }}>
      <Form.Group style={{ marginBottom: 0 }}>
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
    <DatePicker
      value={dayRange}
      onChange={handleDayRangeSelect}
      renderInput={renderCustomInput} // render a custom input
      shouldHighlightWeekends
    />
  );
};

const DayRangeSelect = styled.div({
  display: 'flex',
  marginTop: -22,
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

export default DayRangeSelector;
