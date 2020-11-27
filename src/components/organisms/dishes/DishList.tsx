import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Dish } from '../../../interfaces/domains/dish';
import { DishContext } from '../../../pages/dishes';

import DishCard from './DishCard';

const DishList: React.FC = () => {
  const { dishes } = useContext(DishContext);

  const mappedDish = (): Dish[][] => {
    const size = Math.floor(dishes.length / 4);
    let count = 0;
    const newArray = [];
    while (count <= size) {
      newArray.push(dishes.slice(count * 4, (count + 1) * 4));
      count += 1;
    }
    return newArray;
  };

  return (
    <>
      <div>
        {
          mappedDish().map((mappedDishes) => (
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
    </>
  );
};

export default DishList;
