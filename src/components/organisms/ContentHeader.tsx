import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
};

const ContentHeader: React.FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <Container>
      <Title>
        <h2>{title}</h2>
      </Title>
      {children}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  marginTop: 20,
});

const Title = styled.div({
  width: '100%',
});

export default ContentHeader;
