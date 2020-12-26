import React from 'react';
import styled from 'styled-components';

type Props = {
  subtitle: string;
};

const ContentSubHeader: React.FC<Props> = (props) => {
  const { subtitle, children } = props;

  return (
    <Container>
      <Subtitle>
        <h5>{subtitle}</h5>
      </Subtitle>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Subtitle = styled.div`
  width: 100%;
`;

export default ContentSubHeader;
