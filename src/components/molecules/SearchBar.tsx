import React from 'react';
import { Navbar } from 'react-bootstrap';
import { BsFilter } from 'react-icons/bs';
import styled from 'styled-components';

type Props = {
  style?: React.CSSProperties;
};

const SearchBar: React.FC<Props> = (props) => {
  const { style, children } = props;

  return (
    <Bar variant="light" bg="light" style={{ ...style }}>
      <div>
        <Navbar.Brand><BsFilter /></Navbar.Brand>
      </div>
      {children}
    </Bar>
  );
};

const Bar = styled(Navbar)({
  marginBottom: 16,
  borderRadius: 4,
});

export default SearchBar;
