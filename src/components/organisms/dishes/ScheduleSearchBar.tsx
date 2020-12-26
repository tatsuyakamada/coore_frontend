import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduleCategoryOptionWithColor } from '../../../enum/schedule_category';
import { isScheduleCategory } from '../../../interfaces/domains/schedule';
import DayRangeSelector from '../../molecules/DayRangeSelector';
import SearchBar from '../../molecules/SearchBar';
import SelectableBadge from '../../molecules/SelectableBadge';
import { ScheduledMenuContext } from '../../pages/dishes/show';

const ScheduleSearchBar: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(ScheduledMenuContext);

  const selected = (category: string): boolean => (
    isScheduleCategory(category) && searchCondition.categories.includes(category)
  );

  const handleClick = (category: string): void => {
    if (isScheduleCategory(category)) searchConditionDispatch({ type: 'category', category });
  };

  const handleSelect = (dayRange: DayRange): void => (
    searchConditionDispatch({ type: 'dayRange', dayRange })
  );

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  return (
    <SearchBar style={{ padding: 16 }}>
      {
        ScheduleCategoryOptionWithColor.map((option) => (
          <SelectableBadge
            key={option.value}
            option={option}
            selected={selected(option.value)}
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

const ResetButton = styled(Button)`
  display: flex;
  margin-left: 42px;
  align-items: center;
`;

export default ScheduleSearchBar;
