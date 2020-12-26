import React, { createContext, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { Info, InfoAction, infoReducer } from '../../reducers/information';
import mobile from '../../utils/responsive';
import Information from '../organisms/Infomation';

export const DeviceContext = createContext({} as {
  isMobile: boolean;
});

export const InfoContext = createContext({} as {
  infos: Info[];
  infoDispatch: React.Dispatch<InfoAction>;
});

const Layout: React.FC = (props) => {
  const { children } = props;

  const [infos, infoDispatch] = useReducer(infoReducer, []);
  const isMobile = useMediaQuery(mobile);

  return (
    <DeviceContext.Provider value={{ isMobile }}>
      <MainContent fluid>
        <InfoContext.Provider value={{ infos, infoDispatch }}>
          <Information />
          {children}
        </InfoContext.Provider>
      </MainContent>
    </DeviceContext.Provider>
  );
};

const MainContent = styled(Container)`
  margin-top: 20px;
`;

export default Layout;
