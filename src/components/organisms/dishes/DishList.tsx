import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Dish } from '../../../interfaces/domains/dish';

type Props = {
  dishes: Dish[];
}

const DishList: React.FC<Props> = (props) => {
  const { dishes } = props;

  return (
    <ListGroup>
      {
        dishes.map((dish) => (
          <ListGroup.Item as="div" key={dish.id}>
            <Item>
              <p>{dish.genre}</p>
              <Link to={`dishes/edit/${dish.id}`}>
                {dish.name}
              </Link>
            </Item>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
};

const Item = styled.div({
});

export default DishList;
