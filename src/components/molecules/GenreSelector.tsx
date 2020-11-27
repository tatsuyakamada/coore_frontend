import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

import GenreOption from '../../enum/genre';
import { Genre } from '../../interfaces/domains/dish';

type Props = {
  onChange: (value: Genre) => void;
  selected?: string | number;
};

const GenreSelector: React.FC<Props> = (props) => {
  const { onChange, selected } = props;

  const handleChange = (value: Genre): void => {
    onChange(value);
  };

  return (
    <ToggleButtonGroup
      type="radio"
      name="option"
      defaultValue={selected || GenreOption[0].value}
      onChange={handleChange}
    >
      {
        GenreOption.map((option) => (
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
  width: 90,
});

export default GenreSelector;
