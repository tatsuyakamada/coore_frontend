import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { ScheduleCategory } from '../../interfaces/domains/schedule';
import { ScheduleCategoryColor } from '../../utils/colors';

type Props = {
  category: ScheduleCategory;
}

const ScheduleBadge: React.FC<Props> = (props) => {
  const { category } = props;
  const colorByCategory = (
    { backgroundColor: ScheduleCategoryColor[category] }
  );

  return (
    <div>
      <CategoryBadge style={{ ...colorByCategory }}>
        {category}
      </CategoryBadge>
    </div>
  );
};

const CategoryBadge = styled(Badge)({
  margin: 'auto',
  width: 65,
  verticalAlign: 'text-top',
  color: 'white',
});

export default ScheduleBadge;
