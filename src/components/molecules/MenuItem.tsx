import React from 'react';
import styled from 'styled-components';

import { MenuCategory } from '../../interfaces/domains/menu';
import MenuBadge from '../atoms/MenuBadge';

type Props = {
  id: number;
  category: MenuCategory;
  name: string;
  onClick?: () => void;
};

const MenuItem: React.FC<Props> = (props) => {
  const {
    id, category, name, children,
  } = props;

  return (
    <Menu id={`menu-${id}`} key={id}>
      <MenuBadge category={category} />
      <Name>{name}</Name>
      {children}
    </Menu>
  );
};

const Menu = styled.div({
  display: 'flex',
});

const Name = styled.span({
  display: 'flex',
  paddingLeft: 4,
  alignItems: 'center',
  fontSize: 14,
});

export default MenuItem;
