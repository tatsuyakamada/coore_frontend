import React from 'react';

import { Genres } from '../../enum/genre';
import { Genre, isGenre } from '../../interfaces/domains/dish';
import SelectableGenreBadge from '../atoms/SelectableGenreBadge';

type Props = {
  genres: Genre[];
  onClick: (genre: Genre) => void;
}

const MultipleGenreSelector: React.FC<Props> = (props) => {
  const { genres, onClick } = props;

  const selected = (genre: Genre): boolean => genres.includes(genre);

  return (
    <>
      {
        Object.keys(Genres).map((genre) => (
          isGenre(genre) && (
            <SelectableGenreBadge
              key={genre}
              genre={genre}
              selected={selected(genre)}
              onClick={onClick}
            />
          )
        ))
      }
    </>
  );
};

export default MultipleGenreSelector;
