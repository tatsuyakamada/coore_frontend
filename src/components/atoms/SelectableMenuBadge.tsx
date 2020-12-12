import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { MenuCategories } from '../../enum/scheduled_menu_category';
import { MenuCategory } from '../../interfaces/domains/menu';
import { MenuCategoryColor } from '../../utils/colors';

type Props = {
  category: MenuCategory;
  selected: boolean;
  onClick: (category: MenuCategory) => void;
}

const SelectableMenuBadge: React.FC<Props> = (props) => {
  const { category, selected, onClick } = props;

  const handleClick = (): void => onClick(category);

  const selectedColor: React.CSSProperties = { backgroundColor: MenuCategoryColor[category] };

  const unselectedColor: React.CSSProperties = (
    {
      color: MenuCategoryColor[category],
      backgroundColor: 'white',
      border: `solid 1px ${MenuCategoryColor[category]}`,
    }
  );

  const styleByselected: React.CSSProperties = selected ? selectedColor : unselectedColor;

  return (
    <Button id={category} onClick={handleClick}>
      <MenuBadgeIcon pill style={{ ...styleByselected }}>
        {MenuCategories[category]}
      </MenuBadgeIcon>
    </Button>
  );
};

const Button = styled.button({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  padding: 0,
  appearance: 'none',
  '&:focus': {
    outline: 'none',
  },
});

const MenuBadgeIcon = styled(Badge)({
  display: 'flex',
  marginRight: 12,
  height: 30,
  width: 80,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 14,
  color: 'white',
  cursor: 'pointer',
});

export default SelectableMenuBadge;
