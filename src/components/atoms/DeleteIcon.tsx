import React from 'react';
import { FiDelete } from 'react-icons/fi';
import styled from 'styled-components';

import Color from '../../utils/colors';

type Props = {
  onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}

const DeleteIcon: React.FC<Props> = (props) => {
  const {
    onClick, height, width, style, iconStyle,
  } = props;

  const iconSize: React.CSSProperties = (
    { height: height || 20, width: width || 20 }
  );

  return (
    <Delete onClick={onClick} style={{ ...style }}>
      <FiDelete style={{ ...iconSize, ...iconStyle }} />
    </Delete>
  );
};

const Delete = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: ${Color.red};
  cursor: pointer;
`;

export default DeleteIcon;
