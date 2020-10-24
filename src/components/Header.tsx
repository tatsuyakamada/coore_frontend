import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        React Bootstrap
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
