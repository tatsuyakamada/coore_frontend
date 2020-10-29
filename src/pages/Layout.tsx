import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Layout: React.FC = (props) => {
  const { children } = props;

  return (
    <MainContent>
      {children}
    </MainContent>
  );
};

const MainContent = styled(Container)({
  marginTop: 20,
});

export default Layout;
