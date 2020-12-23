import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

import GenreOption from '../../enum/genre';

type Props = {
  options: Option[];
  onChange: (value: string) => void;
  selected?: string | number;
};

type Option = {
  value: string;
  label: string;
};

const ToggleSelector: React.FC<Props> = (props) => {
  const { options, onChange, selected } = props;

  const handleChange = (value: string): void => onChange(value);

  return (
    <ButtonGroup
      type="radio"
      name="option"
      defaultValue={selected || GenreOption[0].value}
      onChange={handleChange}
    >
      {
        options.map((option) => (
          <ButtonItem
            key={option.value}
            variant="outline-info"
            value={option.value}
          >
            {option.label}
          </ButtonItem>
        ))
      }
    </ButtonGroup>
  );
};

const ButtonGroup = styled(ToggleButtonGroup)({
  width: '100%',
});

const ButtonItem = styled(ToggleButton)({
  width: 75,
});

export default ToggleSelector;
