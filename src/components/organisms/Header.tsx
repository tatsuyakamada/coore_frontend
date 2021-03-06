import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header: React.FC = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Coocre</Navbar.Brand>
    <Nav>
      <Nav.Link href="/schedules">Schedule</Nav.Link>
      <Nav.Link href="/dishes">Dish</Nav.Link>
      <Nav.Link href="/stuffs">Stuff</Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
