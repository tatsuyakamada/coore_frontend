import React, { useState, useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import ScheduleCategory from '../../enum/schedule_category';
import Selector from '../Selector';
import { ScheduleContext } from './CreateForm';

const ScheduleForm: React.FC = () => {
  const { schedule, scheduleDispatch } = useContext(ScheduleContext);

  const initialDate = {
    year: schedule.date.getFullYear(),
    month: schedule.date.getMonth() + 1,
    day: schedule.date.getDate(),
  };

  const handleDateSelect = (value: DayValue | null): void => {
    setSelectedDay(value);
    const date = value ? new Date(value.year, value.month, value.day) : schedule.date;
    scheduleDispatch({ type: 'date', value: date });
  };

  const [selectedDay, setSelectedDay] = useState<DayValue>(initialDate);

  const renderCustomInput = ({ ref }: any) => {
    return (
      <DateSelector
        ref={ref}
        value={schedule.date.toLocaleDateString()}
      />
    );
  };

  const handleCategorySelect = (event: any) => {
    scheduleDispatch({ type: 'category', value: event.target.value });
  };

  const handleImageSelect = (event: any) => {
    if (event.target.files[0]) scheduleDispatch({ type: 'image', value: event.target.files[0] });
  };

  return (
    <Form.Group>
      <Form.Label>Schedule</Form.Label>
      <InputGroup style={{ width: '70%' }}>
        <InputGroup.Prepend>
          <InputLabel id="date">Date</InputLabel>
        </InputGroup.Prepend>
        <DatePicker
          value={selectedDay}
          onChange={handleDateSelect}
          renderInput={renderCustomInput} // render a custom input
          shouldHighlightWeekends
        />
      </InputGroup>
      <InputGroup style={{ width: '70%' }}>
        <InputGroup.Prepend>
          <InputLabel id="scheduleCategory">Category</InputLabel>
        </InputGroup.Prepend>
        <Selector
          options={ScheduleCategory}
          onChange={handleCategorySelect}
        />
      </InputGroup>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleImageSelect}
      />
    </Form.Group>
  );
};

const InputLabel = styled(InputGroup.Text)({
  width: 100,
});

const DateSelector = styled(Form.Control)({
  width: '118%',
});

export default ScheduleForm;
