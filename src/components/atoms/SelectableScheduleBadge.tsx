import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { ScheduleCategory } from '../../interfaces/domains/schedule';
import { ScheduleCategoryColor } from '../../utils/colors';

type Props = {
  category: ScheduleCategory;
  selected: boolean;
  onClick: (category: ScheduleCategory) => void;
}

const SelectableGenreBadge: React.FC<Props> = (props) => {
  const { category, selected, onClick } = props;

  const selectedColor: React.CSSProperties = (
    { backgroundColor: ScheduleCategoryColor[category] }
  );

  const unselectedColor: React.CSSProperties = (
    {
      color: ScheduleCategoryColor[category],
      backgroundColor: 'white',
      border: `solid 1px ${ScheduleCategoryColor[category]}`,
    }
  );

  const styleByselected: React.CSSProperties = selected ? selectedColor : unselectedColor;

  const handleClick = (): void => (
    onClick(category)
  );

  return (
    <Button id={category} onClick={handleClick}>
      <CategoryBadge pill style={{ ...styleByselected }}>
        {category}
      </CategoryBadge>
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

const CategoryBadge = styled(Badge)({
  display: 'flex',
  marginRight: 12,
  height: 35,
  width: 100,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 14,
  color: 'white',
  borderRadius: 4,
  cursor: 'pointer',
});

export default SelectableGenreBadge;
