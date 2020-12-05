import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { Genre, isGenre } from '../../interfaces/domains/dish';
import { GenreColor } from '../../utils/colors';

type Props = {
  genre: Genre;
  selected: boolean;
  onClick: (genre: Genre) => void;
}

const SelectableGenreBadge: React.FC<Props> = (props) => {
  const { genre, selected, onClick } = props;

  const selectedColor = (): React.CSSProperties => (
    { backgroundColor: GenreColor[genre] }
  );

  const unselectedColor = (): React.CSSProperties => (
    { color: GenreColor[genre], backgroundColor: 'white', border: `solid 0.5px ${GenreColor[genre]}` }
  );

  const styleByselected = (): React.CSSProperties => (
    selected ? selectedColor() : unselectedColor()
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const target = event.currentTarget.id;
    if (isGenre(target)) onClick(target);
  };

  return (
    <Button id={genre} onClick={handleClick}>
      <GenreBadgeIcon pill style={{ ...styleByselected() }}>
        {genre}
      </GenreBadgeIcon>
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

const GenreBadgeIcon = styled(Badge)({
  display: 'flex',
  marginRight: 12,
  height: 30,
  width: 100,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 14,
  color: 'white',
  cursor: 'pointer',
});

export default SelectableGenreBadge;
