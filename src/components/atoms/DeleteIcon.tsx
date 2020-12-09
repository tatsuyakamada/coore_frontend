import React from 'react';
import { FiDelete } from 'react-icons/fi';
import styled from 'styled-components';

import Color from '../../utils/colors';

type Props = {
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

const DeleteIcon: React.FC<Props> = (props) => {
  const {
    onClick, height, width, style,
  } = props;

  const iconStyle = (
    { height: height || 20, width: width || 20 }
  );

  return (
    <Delete onClick={onClick}>
      <FiDelete style={{ ...iconStyle, ...style }} />
    </Delete>
  );
};

const Delete = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: `${Color.red}`,
  cursor: 'pointer',
});

export default DeleteIcon;
