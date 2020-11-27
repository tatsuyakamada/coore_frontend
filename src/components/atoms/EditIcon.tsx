import React from 'react';
import { BiPencil } from 'react-icons/bi';
import styled from 'styled-components';

import Color from '../../utils/colors';

type Props = {
  onClick: () => void;
  height?: number;
  width?: number;
}

const EditIcon: React.FC<Props> = (props) => {
  const { onClick, height, width } = props;

  const iconStyle = (
    { height: height || 20, width: width || 20 }
  );

  return (
    <Edit onClick={onClick}>
      {console.log(Color.green)}
      <BiPencil style={{ ...iconStyle }} />
    </Edit>
  );
};

const Edit = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: `${Color.green}`,
  cursor: 'pointer',
});

export default EditIcon;
