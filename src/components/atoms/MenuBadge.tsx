import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { MenuCategory } from '../../interfaces/domains/menu';
import { MenuCategoryColor } from '../../utils/colors';

type Props = {
  category: MenuCategory;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

const MenuBadge: React.FC<Props> = (props) => {
  const {
    category, height, width, style,
  } = props;

  const badgeStyle: React.CSSProperties = (
    {
      height: height || 20,
      width: width || 60,
      backgroundColor: MenuCategoryColor[category],
    }
  );

  return (
    <div>
      <CategoryBadge pill style={{ ...badgeStyle, ...style }}>
        {category}
      </CategoryBadge>
    </div>
  );
};

const CategoryBadge = styled(Badge)({
  margin: 'auto',
  verticalAlign: 'text-top',
  color: 'white',
});

export default MenuBadge;
