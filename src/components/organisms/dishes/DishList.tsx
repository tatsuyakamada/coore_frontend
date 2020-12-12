import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Dish } from '../../../interfaces/domains/dish';
import mappedItem from '../../../utils/mappedItem';
import { DeviceContext } from '../../pages/Layout';

import DishCard from './DishCard';

type Props = {
  dishes: Dish[];
  columns?: number;
}

const DishList: React.FC<Props> = (props) => {
  const { dishes, columns } = props;

  const { isMobile } = useContext(DeviceContext);

  const listStyle: React.CSSProperties | null = (
    isMobile ? { height: '85vh', overflowY: 'scroll' } : null
  );

  return (
    <div style={{ ...listStyle }}>
      {
        mappedItem<Dish>(dishes, columns || 4).map((mappedDishes) => (
          <Row>
            {
              mappedDishes.map((dish) => (
                <Col key={dish.id} className={`col-${columns ? 12 / columns : 3}`}>
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
