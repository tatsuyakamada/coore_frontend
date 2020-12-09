import React, { createContext, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { Error, ErrorAction, errorReducer } from '../../reducers/error';
import Alert from '../organisms/Alert';

export const ErrorContext = createContext({} as {
  errors: Error[];
  errorDispatch: React.Dispatch<ErrorAction>;
});

const Layout: React.FC = (props) => {
  const { children } = props;

  const [errors, errorDispatch] = useReducer(errorReducer, []);

  return (
    <MainContent fluid>
      <ErrorContext.Provider value={{ errors, errorDispatch }}>
        <Alert />
        {children}
      </ErrorContext.Provider>
    </MainContent>
  );
};

const MainContent = styled(Container)({
  marginTop: 20,
});

export default Layout;
