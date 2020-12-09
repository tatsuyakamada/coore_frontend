import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { Genres } from '../../enum/genre';
import { Genre } from '../../interfaces/domains/dish';
import { GenreColor } from '../../utils/colors';

type Props = {
  genre: Genre;
  style?: React.CSSProperties;
};

const GenreBadge: React.FC<Props> = (props) => {
  const { genre, style } = props;

  const colorByCategory: React.CSSProperties = (
    { backgroundColor: GenreColor[genre] }
  );

  return (
    <div>
      <GenreBadgeIcon pill style={{ ...colorByCategory, ...style }}>
        {Genres[genre]}
      </GenreBadgeIcon>
    </div>
  );
};

const GenreBadgeIcon = styled(Badge)({
  margin: 'auto',
  width: 60,
  verticalAlign: 'text-top',
  color: 'white',
});

export default GenreBadge;
