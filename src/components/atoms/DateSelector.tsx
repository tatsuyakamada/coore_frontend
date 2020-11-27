import React from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';

const DateSelector: React.FC = () => {
  const [day, setDay] = React.useState<DayValue>(null);

  return (
    <>
      <DatePicker value={day} onChange={setDay} />
    </>
  );
};

export default DateSelector;
