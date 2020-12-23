import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduleCategoryOptionWithColor } from '../../../enum/schedule_category';
import { isScheduleCategory } from '../../../interfaces/domains/schedule';
import DayRangeSelector from '../../molecules/DayRangeSelector';
import SearchBar from '../../molecules/SearchBar';
import SelectableBadge from '../../molecules/SelectableBadge';
import { ScheduledMenuContext } from '../../pages/schedules/index';

const ScheduleSearchBar: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(ScheduledMenuContext);

  const handleClick = (category: string): void => {
    if (isScheduleCategory(category)) searchConditionDispatch({ type: 'category', category });
  };

  const handleSelect = (dayRange: DayRange): void => (
    searchConditionDispatch({ type: 'dayRange', dayRange })
  );

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  const categorySelected = (category: string): boolean => (
    isScheduleCategory(category) && searchCondition.categories.includes(category)
  );

  return (
    <SearchBar style={{ padding: 16 }}>
      {
        ScheduleCategoryOptionWithColor.map((option) => (
          <SelectableBadge
            key={option.value}
            option={option}
            selected={categorySelected(option.value)}
            onClick={handleClick}
            style={{ width: 100, height: 35, borderRadius: 4 }}
          />
        ))
      }
      <DayRangeSelector dayRange={searchCondition.dayRange} onSelect={handleSelect} />
      <ResetButton onClick={handleReset}>
        reset
      </ResetButton>
    </SearchBar>
  );
};

const ResetButton = styled(Button)({
  display: 'flex',
  height: 35,
  marginLeft: 42,
  alignItems: 'center',
});

export default ScheduleSearchBar;
