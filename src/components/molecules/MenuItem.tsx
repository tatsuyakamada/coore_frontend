import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

import { MenuCategory } from '../../interfaces/domains/menu';
import { MenuCategoryColor } from '../../utils/colors';
import LabelBadge from '../atoms/LabelBadge';

type Props = {
  id: number | string;
  category: MenuCategory;
  name: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const MenuItem: React.FC<Props> = (props) => {
  const {
    id, category, name, children, style,
  } = props;

  const handleHover = (
    <Tooltip id={id.toString()}>
      {
        name.split('/').map((separatedName) => (
          <div key={separatedName}>{separatedName}</div>
        ))
      }
    </Tooltip>
  );

  return (
    <Menu id={`menu-${id}`} key={id} style={{ ...style }}>
      <LabelBadge
        label={category}
        color={MenuCategoryColor[category]}
      />
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 0 }}
        overlay={handleHover}
      >
        <Name>{name}</Name>
      </OverlayTrigger>
      {children}
    </Menu>
  );
};

const Menu = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const Name = styled.span`
  display: inline-block;
  padding-left: 4px;
  align-items: center;
  white-space: nowrap;
  overflow-x: hidden;
  font-size: 14px;
`;

export default MenuItem;
