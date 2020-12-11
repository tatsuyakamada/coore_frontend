import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { ScheduleCategory } from '../../interfaces/domains/schedule';
import { ScheduleCategoryColor } from '../../utils/colors';

type Props = {
  category: ScheduleCategory;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

const ScheduleBadge: React.FC<Props> = (props) => {
  const {
    category, height, width, style,
  } = props;

  const badgeStyle: React.CSSProperties = (
    {
      height: height || 20,
      width: width || 65,
      backgroundColor: ScheduleCategoryColor[category],
    }
  );

  return (
    <div>
      <CategoryBadge style={{ ...badgeStyle, ...style }}>
        {category}
      </CategoryBadge>
    </div>
  );
};

const CategoryBadge = styled(Badge)({
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
});

export default ScheduleBadge;
