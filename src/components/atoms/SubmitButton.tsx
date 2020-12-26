import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  id: number | null;
  onClick: () => void;
  style?: React.CSSProperties;
}

const SubmitButton: React.FC<Props> = (props) => {
  const { id, onClick, style } = props;

  return (
    <Submit variant="primary" onClick={onClick} style={{ ...style }}>
      { id ? 'Update' : 'Save' }
    </Submit>
  );
};

const Submit = styled(Button)`
  margin-right: 16px;
`;

export default SubmitButton;
