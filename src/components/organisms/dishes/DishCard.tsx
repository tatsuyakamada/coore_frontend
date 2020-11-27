import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import { Dish } from '../../../interfaces/domains/dish';
import { DishContext } from '../../../pages/dishes';
import EditIcon from '../../atoms/EditIcon';
import GenreBadge from '../../atoms/GenreBadge';

type Props = {
  dish: Dish;
}

const DishCard: React.FC<Props> = (props) => {
  const { dish } = props;

  const { dishFormDispatch } = useContext(DishContext);

  const handleEdit = () => (
    dishFormDispatch({ type: 'edit', value: { show: true, dish } })
  );

  return (
    <Content>
      <Label>
        <GenreBadge genre={dish.genre} />
        <Name>{dish.name}</Name>
        <EditIcon
          onClick={handleEdit}
          style={{ marginLeft: 'auto' }}
        />
      </Label>
    </Content>
  );
};

const Content = styled(Card)({
  marginBottom: 8,
});

const Label = styled(Card.Body)({
  display: 'flex',
  padding: 12,
});

const Name = styled.span({
  display: 'flex',
  paddingLeft: 4,
  alignItems: 'center',
  fontSize: 14,
});

export default DishCard;
