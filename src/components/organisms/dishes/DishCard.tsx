import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Genres } from '../../../enum/genre';
import { Dish, DraftDishStuff } from '../../../interfaces/domains/dish';
import { GenreColor } from '../../../utils/colors';
import EditIcon from '../../atoms/EditIcon';
import LabelBadge from '../../atoms/LabelBadge';
import { DishContext } from '../../pages/dishes/index';

type Props = {
  dish: Dish;
};

const DishCard: React.FC<Props> = (props) => {
  const { dish } = props;

  const { dishDispatch, dishModalDispatch } = useContext(DishContext);

  const history = useHistory();

  const handleClick = (): void => {
    history.push({ pathname: `/dishes/${dish.id}`, state: { id: dish.id } });
  };

  const handleEdit = (event: React.MouseEvent<HTMLInputElement>): void => {
    dishDispatch({ type: 'edit', dish: { ...dish, dishStuffs: translatedDishStuffs() } });
    dishModalDispatch({ type: 'open' });
    event.stopPropagation();
  };

  const translatedDishStuffs = (): DraftDishStuff[] => {
    const newDishStuffs: DraftDishStuff[] = [];
    dish.dishStuffs.forEach((dishStuff, index) => {
      newDishStuffs.push({
        id: dishStuff.id,
        index,
        stuffId: dishStuff.stuffId,
        stuffName: dishStuff.stuffName,
        category: dishStuff.category,
        delete: false,
      });
    });
    return newDishStuffs;
  };

  return (
    <Content onClick={handleClick}>
      <Label>
        <LabelBadge
          label={Genres[dish.genre]}
          color={GenreColor[dish.genre]}
          style={{ width: 55 }}
        />
        <Name>{dish.name}</Name>
        <EditIcon onClick={handleEdit} style={{ marginLeft: 'auto' }} />
      </Label>
    </Content>
  );
};

const Content = styled(Card)`
  margin-bottom: 8px;
`;

const Label = styled(Card.Body)`
  display: flex;
  padding: 12px;
`;

const Name = styled.span`
  display: flex;
  padding-left: 4px;
  align-items: center;
  font-size: 14px;
`;

export default DishCard;
