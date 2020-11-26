import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  options: Option[];
  onChange: (value: string | number) => void;
  selected?: string | number;
};

type Option = {
  value: string | number;
  label: string;
};

const RadioSelector: React.FC<Props> = (props) => {
  const { options, onChange, selected } = props;

  const handleChange = (value: string | number): void => {
    onChange(value);
  };

  return (
    <ToggleButtonGroup
      type="radio"
      name="option"
      defaultValue={selected || options[0].value}
      onChange={handleChange}
    >
      {
        options.map((option) => (
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
  width: 80,
});

export default RadioSelector;
