import React from 'react';
import { BiPencil } from 'react-icons/bi';
import styled from 'styled-components';

import Color from '../../utils/colors';

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
};

const EditIcon: React.FC<Props> = (props) => {
  const {
    onClick, height, width, style,
  } = props;

  const iconStyle: React.CSSProperties = (
    { height: height || 20, width: width || 20 }
  );

  return (
    <Edit onClick={onClick} style={{ ...style }}>
      <BiPencil style={{ ...iconStyle, ...style }} />
    </Edit>
  );
};

const Edit = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: ${Color.green};
  cursor: pointer;
`;

export default EditIcon;
