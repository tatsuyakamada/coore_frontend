import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  id: number;
  category: string;
  name: string;
  onClick?: () => void;
};

const MenuItem: React.FC<Props> = (props) => {
  const {
    id, category, name, children,
  } = props;

  const menuCategolize = () => {
    switch (category) {
      case 'main':
        return 'danger';
      case 'side':
        return 'success';
      case 'dessert':
        return 'info';
      case 'other':
        return 'secondary';
      default:
        return 'light';
    }
  };

  return (
    <Menu id={`menu-${id}`} key={id}>
      <div>
        <Category
          pill
          variant={menuCategolize()}
        >
          {category}
        </Category>
      </div>
      <Name>{name}</Name>
      {children}
    </Menu>
  );
};

const Menu = styled.div({
  display: 'flex',
});

const Category = styled(Badge)({
  margin: 'auto',
  verticalAlign: 'text-top',
});

const Name = styled.span({
  paddingLeft: 8,
});

export default MenuItem;
