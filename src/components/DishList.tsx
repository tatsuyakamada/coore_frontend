import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Dish } from '../interfaces/domains/dish';

type Props = {
  dishes: Dish[];
}

const DishList: React.FC<Props> = (props) => {
  const { dishes } = props;
  return (
    <ListGroup>
      {
        dishes.map((dish) => {
          return <ListGroup.Item>{dish.id}</ListGroup.Item>;
        })
      }
    </ListGroup>
  );
};

export default DishList;
