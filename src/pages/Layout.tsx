import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Layout: React.FC = (props) => {
  const { children } = props;

  return (
    <MainContent fluid="true">
      {children}
    </MainContent>
  );
};

const MainContent = styled(Container)({
  marginTop: 20,
  padding: '0px 72px',
});

export default Layout;
