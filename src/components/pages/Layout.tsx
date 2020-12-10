import React, { createContext, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { Error, ErrorAction, errorReducer } from '../../reducers/error';
import mobile from '../../utils/responsive';
import Alert from '../organisms/Alert';

export const DeviceContext = createContext({} as {
  isMobile: boolean;
});

export const ErrorContext = createContext({} as {
  errors: Error[];
  errorDispatch: React.Dispatch<ErrorAction>;
});

const Layout: React.FC = (props) => {
  const { children } = props;

  const [errors, errorDispatch] = useReducer(errorReducer, []);
  const isMobile = useMediaQuery(mobile);

  return (
    <DeviceContext.Provider value={{ isMobile }}>
      <MainContent fluid>
        <ErrorContext.Provider value={{ errors, errorDispatch }}>
          <Alert />
          {children}
        </ErrorContext.Provider>
      </MainContent>
    </DeviceContext.Provider>
  );
};

const MainContent = styled(Container)({
  marginTop: 20,
});

export default Layout;
