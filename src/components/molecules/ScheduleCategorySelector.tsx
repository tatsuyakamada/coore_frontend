import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

import ScheduleCategoryOption from '../../enum/schedule_category';
import { ScheduleCategory } from '../../interfaces/domains/schedule';

type Props = {
  onChange: (value: ScheduleCategory) => void;
  selected?: string | number;
};

const ScheduleCategorySelector: React.FC<Props> = (props) => {
  const { onChange, selected } = props;

  const handleChange = (value: ScheduleCategory): void => {
    onChange(value);
  };

  return (
    <ToggleButtonGroup
      type="radio"
      name="option"
      defaultValue={selected || ScheduleCategoryOption[0].value}
      onChange={handleChange}
    >
      {
        ScheduleCategoryOption.map((option) => (
          <ButtonItem
            variant="outline-info"
            value={option.value}
          >
            {option.value}
          </ButtonItem>
        ))
      }
    </ToggleButtonGroup>
  );
};

const ButtonItem = styled(ToggleButton)({
  width: 75,
  padding: '6px 8px',
});

export default ScheduleCategorySelector;
