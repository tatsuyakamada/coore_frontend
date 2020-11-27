import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { Genre } from '../../interfaces/domains/dish';
import { GenreColor } from '../../utils/colors';

type Props = {
  genre: Genre;
}

const GenreBadge: React.FC<Props> = (props) => {
  const { genre } = props;

  const colorByCategory = (
    { backgroundColor: GenreColor[genre] }
  );

  return (
    <div>
      <GenreBadgeIcon pill style={{ ...colorByCategory }}>
        {genre}
      </GenreBadgeIcon>
    </div>
  );
};

const GenreBadgeIcon = styled(Badge)({
  margin: 'auto',
  width: 75,
  verticalAlign: 'text-top',
  color: 'white',
});

export default GenreBadge;
