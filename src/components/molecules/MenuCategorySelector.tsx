import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

import MenuCategoryOption from '../../enum/scheduled_menu_category';
import { MenuCategory } from '../../interfaces/domains/menu';

type Props = {
  onChange: (value: MenuCategory) => void;
  selected?: string | number;
};

const MenuCategorySelector: React.FC<Props> = (props) => {
  const { onChange, selected } = props;

  const handleChange = (value: MenuCategory): void => {
    onChange(value);
  };

  return (
    <ToggleButtonGroup
      type="radio"
      name="option"
      defaultValue={selected || MenuCategoryOption[0].value}
      onChange={handleChange}
    >
      {
        MenuCategoryOption.map((option) => (
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

export default MenuCategorySelector;
