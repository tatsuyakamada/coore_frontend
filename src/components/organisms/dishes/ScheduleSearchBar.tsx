import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { DayRange } from 'react-modern-calendar-datepicker';
import styled from 'styled-components';

import { ScheduleCategory } from '../../../interfaces/domains/schedule';
import DayRangeSelector from '../../molecules/DayRangeSelector';
import MultiScheduleCategorySelector from '../../molecules/MultiScheduleCategorySelector';
import SearchBar from '../../molecules/SearchBar';
import { ScheduledMenuContext } from '../../pages/dishes/show';

const ScheduleSearchBar: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(ScheduledMenuContext);

  const handleClick = (category: ScheduleCategory): void => (
    searchConditionDispatch({ type: 'category', category })
  );

  const handleSelect = (dayRange: DayRange): void => (
    searchConditionDispatch({ type: 'dayRange', dayRange })
  );

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  return (
    <SearchBar style={{ padding: 16 }}>
      <MultiScheduleCategorySelector
        categories={searchCondition.categories}
        onClick={handleClick}
      />
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
