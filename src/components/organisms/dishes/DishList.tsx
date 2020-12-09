import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

import { Dish } from '../../../interfaces/domains/dish';
import { DishContext } from '../../../pages/dishes';
import mappedItem from '../../../utils/mappedItem';
import mobile from '../../../utils/responsive';

import DishCard from './DishCard';
import DishSearchBar from './DishSearchBar';
import DishSearchModal from './DishSearchModal';

const DishList: React.FC = () => {
  const { dishes, searchCondition } = useContext(DishContext);

  const isMobile = useMediaQuery(mobile);

  const filteredDishes = (): Dish[] => {
    const { genres, words } = searchCondition;
    return dishes.filter((dish) => (
      genres.includes(dish.genre) && (words ? dish.name.indexOf(words) > -1 : true)
    ));
  };

  const listStyle = (): React.CSSProperties | null => (
    isMobile ? { height: '85vh', overflowY: 'scroll' } : null
  );

  return (
    <>
      {
        isMobile
          ? <DishSearchModal />
          : <DishSearchBar />
      }
      <div style={{ ...listStyle() }}>
        {
          mappedItem<Dish>(filteredDishes(), 1).map((mappedDishes) => (
            <Row>
              {
                mappedDishes.map((dish) => (
                  <Col>
                    <DishCard key={dish.id} dish={dish} />
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
