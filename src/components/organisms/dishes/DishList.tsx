import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Dish } from '../../../interfaces/domains/dish';
import { DishContext } from '../../../pages/dishes';
import mappedItem from '../../../utils/mappedItem';

import DishCard from './DishCard';

const DishList: React.FC = () => {
  const { dishes } = useContext(DishContext);

  return (
    <div>
      {
        mappedItem<Dish>(dishes, 4).map((mappedDishes) => (
          <Row>
            {
              mappedDishes.map((dish) => (
                <Col className="col-3">
                  <DishCard dish={dish} />
                </Col>
              ))
            }
          </Row>
        ))
      }
    </div>
  );
};

export default DishList;
