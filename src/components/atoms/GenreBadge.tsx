import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { Genres } from '../../enum/genre';
import { Genre } from '../../interfaces/domains/dish';
import { GenreColor } from '../../utils/colors';

type Props = {
  genre: Genre;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
};

const GenreBadge: React.FC<Props> = (props) => {
  const {
    genre, height, width, style,
  } = props;

  const badgeStyle: React.CSSProperties = (
    {
      height: height || 20,
      width: width || 55,
      backgroundColor: GenreColor[genre],
    }
  );

  return (
    <div>
      <GenreBadgeIcon pill style={{ ...badgeStyle, ...style }}>
        {Genres[genre]}
      </GenreBadgeIcon>
    </div>
  );
};

const GenreBadgeIcon = styled(Badge)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default GenreBadge;
