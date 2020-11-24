import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DishList from '../components/DishList';
import useDidMount from '../utils/effect';

const Dishes: React.FC = () => {
  const [dishes, setDishes] = useState([]);

  useDidMount(() => {
    axios.get('http://localhost:3100/api/v1/dishes')
      .then((results) => {
        setDishes(results.data);
      })
      .catch((data) => {
        console.log(data);
      });
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 110,
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dishes">Dishes</Link>
      </div>
      <DishList dishes={dishes} />
    </div>
  );
};

export default Dishes;
