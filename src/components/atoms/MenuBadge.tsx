import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { MenuCategory } from '../../interfaces/domains/menu';
import { MenuCategoryColor } from '../../utils/colors';

type Props = {
  category: MenuCategory;
}

const MenuBadge: React.FC<Props> = (props) => {
  const { category } = props;
  const colorByCategory = (
    { backgroundColor: MenuCategoryColor[category] }
  );

  return (
    <div>
      <CategoryBadge pill style={{ ...colorByCategory }}>
        {category}
      </CategoryBadge>
    </div>
  );
};

const CategoryBadge = styled(Badge)({
  margin: 'auto',
  width: 60,
  verticalAlign: 'text-top',
  color: 'white',
});

export default MenuBadge;
