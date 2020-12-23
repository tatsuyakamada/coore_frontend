import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
  option: Option;
  selected: boolean;
  onClick: (option: string) => void;
  style?: React.CSSProperties;
};

export type Option = {
  value: string;
  label: string;
  color: string;
};

const SelectableBadge: React.FC<Props> = (props) => {
  const {
    option, selected, onClick, style,
  } = props;

  const handleClick = (): void => onClick(option.value);

  const selectedStyle: React.CSSProperties = { backgroundColor: option.color };

  const unselectedStyle: React.CSSProperties = (
    {
      color: option.color,
      backgroundColor: 'white',
      border: `solid 1px ${option.color}`,
    }
  );

  const badgeStyle: React.CSSProperties = selected ? selectedStyle : unselectedStyle;

  return (
    <Button id={option.value} onClick={handleClick}>
      <BadgeIcon pill style={{ ...badgeStyle, ...style }}>
        {option.label}
      </BadgeIcon>
    </Button>
  );
};

const Button = styled.button({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  padding: 0,
  appearance: 'none',
  '&:focus': {
    outline: 'none',
  },
});

const BadgeIcon = styled(Badge)({
  display: 'flex',
  marginRight: 12,
  height: 30,
  width: 80,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 14,
  color: 'white',
  cursor: 'pointer',
});

export default SelectableBadge;
