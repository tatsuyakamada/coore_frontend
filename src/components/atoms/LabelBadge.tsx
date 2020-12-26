import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  label: string;
  shape?: 'circle' | 'square';
  color?: string;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

const LabelBadge: React.FC<Props> = (props) => {
  const {
    label, shape, color, height, width, style,
  } = props;

  const badgeStyle: React.CSSProperties = (
    {
      height: height || 20,
      width: width || 60,
      backgroundColor: color,
    }
  );

  return (
    <div>
      <CategoryBadge
        pill={!shape || shape === 'circle'}
        style={{ ...badgeStyle, ...style }}
      >
        {label}
      </CategoryBadge>
    </div>
  );
};

const CategoryBadge = styled(Badge)`
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default LabelBadge;
