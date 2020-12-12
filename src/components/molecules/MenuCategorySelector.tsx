import React, { useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

import MenuCategoryOption from '../../enum/scheduled_menu_category';
import { MenuCategory } from '../../interfaces/domains/menu';

type Props = {
  onChange: (value: MenuCategory) => void;
  selected?: MenuCategory;
};

const MenuCategorySelector: React.FC<Props> = (props) => {
  const { onChange, selected } = props;

  useEffect((): void => {
    if (selected) {
      removeActive();
      addActive(selected);
    }
  }, [selected]);

  const removeActive = (): void => {
    const target = document.getElementsByClassName('active')[0];
    return target && target.classList.remove('active');
  };

  const addActive = (value: MenuCategory): void | null => {
    const target = document.getElementById(value);
    return target && target.classList.add('active');
  };

  const handleChange = (value: MenuCategory): void => {
    removeActive();
    onChange(value);
  };

  return (
    <ButtonGroup
      type="radio"
      name="option"
      defaultValue={selected}
      onChange={handleChange}
    >
      {
        MenuCategoryOption.map((option) => (
          <ButtonItem
            id={option.value}
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
  padding: '6px 4px',
});

export default MenuCategorySelector;
