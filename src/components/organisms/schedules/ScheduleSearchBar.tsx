import React from 'react';
import { DayRange } from 'react-modern-calendar-datepicker';

import { ScheduleCategory } from '../../../interfaces/domains/schedule';
import DayRangeSelector from '../../molecules/DayRangeSelector';
import MultiScheduleCategorySelector from '../../molecules/MultiScheduleCategorySelector';
import SearchBar from '../../molecules/SearchBar';

type Props = {
  categories: ScheduleCategory[];
  onClick: (category: ScheduleCategory) => void;
  dayRange: DayRange;
  onSelect: (selected: DayRange) => void;
}

const ScheduleSearchBar: React.FC<Props> = (props) => {
  const {
    categories, onClick, dayRange, onSelect,
  } = props;

  return (
    <SearchBar>
      <MultiScheduleCategorySelector categories={categories} onClick={onClick} />
      <div>
        <DayRangeSelector dayRange={dayRange} onSelect={onSelect} />
      </div>
    </SearchBar>
  );
};

export default ScheduleSearchBar;
