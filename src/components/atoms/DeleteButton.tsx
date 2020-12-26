import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  style?: React.CSSProperties;
}

const DeleteButton: React.FC<Props> = (props) => {
  const { onClick, style } = props;

  return (
    <Delete variant="secondary" onClick={onClick} style={{ ...style }}>
      Delete
    </Delete>
  );
};

const Delete = styled(Button)({
  marginRight: 16,
});

export default DeleteButton;
