import React, { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { Genres } from '../../enum/genre';
import { Genre } from '../../interfaces/domains/dish';
import { DishContext } from '../../pages/dishes/index';
import { GenreColor } from '../../utils/colors';

type Props = {
  genre: Genre;
}

const SelectableGenreBadge: React.FC<Props> = (props) => {
  const { genre } = props;

  const { searchCondition, searchConditionDispatch } = useContext(DishContext);

  const selectedColor = (): React.CSSProperties => (
    { backgroundColor: GenreColor[genre] }
  );

  const unselectedColor = (): React.CSSProperties => (
    { color: GenreColor[genre], backgroundColor: 'white', border: `solid 0.5px ${GenreColor[genre]}` }
  );

  const styleByselected = (): React.CSSProperties => (
    searchCondition.genres.includes(genre) ? selectedColor() : unselectedColor()
  );

  const handleClick = (): void => (
    searchConditionDispatch({ type: 'genre', value: genre })
  );

  return (
    <Button id={genre} onClick={handleClick}>
      <GenreBadgeIcon pill style={{ ...styleByselected() }}>
        {Genres[genre]}
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
