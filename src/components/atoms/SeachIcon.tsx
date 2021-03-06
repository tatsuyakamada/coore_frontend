import React from 'react';
import { Button } from 'react-bootstrap';
import { BsFilter } from 'react-icons/bs';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
  height?: number;
  width?: number;
}

const SeachIcon: React.FC<Props> = (props) => {
  const { onClick, height, width } = props;

  const iconStyle: React.CSSProperties = (
    { height: height || 32, width: width || 32 }
  );

  return (
    <Search variant="outline-info" onClick={onClick} style={{ ...iconStyle }}>
      <BsFilter />
    </Search>
  );
};

const Search = styled(Button)`
  display: flex;
  margin-right: 8px;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

export default SeachIcon;
