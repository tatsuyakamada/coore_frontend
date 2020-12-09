import React from 'react';

import { Genres } from '../../enum/genre';
import { isGenre } from '../../interfaces/domains/dish';
import SelectableGenreBadge from '../atoms/SelectableGenreBadge';

const MultipleGenreSelector: React.FC = () => (
  <>
    {
      Object.keys(Genres).map((genre) => (
        isGenre(genre) && <SelectableGenreBadge genre={genre} />
      ))
    }
  </>
);

export default MultipleGenreSelector;
