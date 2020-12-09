import React from 'react';
import { Navbar } from 'react-bootstrap';
import { BsFilter } from 'react-icons/bs';
import styled from 'styled-components';

const SearchBar: React.FC = (props) => {
  const { children } = props;

  return (
    <Bar variant="light" bg="light">
      <SeachIcon>
        <Navbar.Brand><BsFilter /></Navbar.Brand>
      </SeachIcon>
      {children}
    </Bar>
  );
};

const Bar = styled(Navbar)({
  marginBottom: 12,
  borderRadius: 4,
});

const SeachIcon = styled.div({
});

export default SearchBar;
