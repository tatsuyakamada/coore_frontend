import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import ContentHeader from '../components/ContentHeader';
import DishList from '../components/DishList';
import { Dish } from '../interfaces/domains/dish';

const Dishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/dishes')
      .then((results) => {
        setDishes(results.data);
      })
      .catch((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <ContentHeader title="Dish">
        <RightContent>
          <Link to="/dishes/new">
            <Button variant="info">
              <AiFillPlusCircle />
            </Button>
          </Link>
        </RightContent>
      </ContentHeader>
      <DishList dishes={dishes} />
    </div>
  );
};

const RightContent = styled.div({
  margin: 'auto',
  textAlign: 'right',
  width: '100%',
});

export default withRouter(Dishes);
