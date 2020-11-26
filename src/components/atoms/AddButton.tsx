import React from 'react';
import { Button } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  height?: number;
  width?: number;
}

const AddButton: React.FC<Props> = (props) => {
  const { onClick, height, width } = props;

  const iconStyle = (
    { height: height || 32, width: width || 32 }
  );

  return (
    <Add variant="outline-info" onClick={onClick} style={{ ...iconStyle }}>
      <AiFillPlusCircle />
    </Add>
  );
};

const Add = styled(Button)({
  display: 'flex',
  padding: 8,
  justifyContent: 'center',
  alignItems: 'center',
});

export default AddButton;
