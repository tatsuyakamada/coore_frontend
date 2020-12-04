import React from 'react';
import { Navbar } from 'react-bootstrap';
import { BsFilter } from 'react-icons/bs';
import styled from 'styled-components';

const SearchBar: React.FC = (props) => {
  const { children } = props;

  return (
    <Bar variant="light" bg="light">
      <Navbar.Brand><BsFilter /></Navbar.Brand>
      {children}
    </Bar>
  );
};

const Bar = styled(Navbar)({
  marginBottom: 12,
  borderRadius: 4,
});

export default SearchBar;
