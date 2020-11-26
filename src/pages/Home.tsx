import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
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
      <Link to="/dishes">Dishes</Link>
    </div>
    <h1>Home</h1>
  </div>
);

export default Home;
