import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

import { MenuCategory } from '../../interfaces/domains/menu';
import MenuBadge from '../atoms/MenuBadge';

type Props = {
  id: number | string;
  category: MenuCategory;
  name: string;
  onClick?: () => void;
};

const MenuItem: React.FC<Props> = (props) => {
  const {
    id, category, name, children,
  } = props;

  const onHover = () => (
    <Tooltip id={id.toString()}>
      {
        name.split('/').map((separatedName) => (
          <div>{separatedName}</div>
        ))
      }
    </Tooltip>
  );

  return (
    <Menu id={`menu-${id}`} key={id}>
      <MenuBadge category={category} />
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 0 }}
        overlay={onHover()}
      >
        <Name>{name}</Name>
      </OverlayTrigger>
      {children}
    </Menu>
  );
};

const Menu = styled.div({
  display: 'flex',
});

const Name = styled.span({
  display: 'inline-block',
  paddingLeft: 4,
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  fontSize: 14,
});

export default MenuItem;
