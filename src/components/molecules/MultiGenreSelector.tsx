import React, { useState } from 'react';

import { Genre } from '../../interfaces/domains/dish';
import SelectableGenreBadge from '../atoms/SelectableGenreBadge';

type Props = {
  onClick: (genre: Genre) => void;
}

const MultipleGenreSelector: React.FC<Props> = (props) => {
  const { onClick } = props;

  const [japanese, setJapanese] = useState<boolean>(true);
  const [western, setWestern] = useState<boolean>(true);
  const [chinese, setChinese] = useState<boolean>(true);
  const [other, setOther] = useState<boolean>(true);

  const handleClick = (genre: Genre): void => {
    switch (genre) {
      case 'japanese':
        setJapanese(!japanese);
        onClick(genre);
        break;
      case 'western':
        setWestern(!western);
        onClick(genre);
        break;
      case 'chinese':
        setChinese(!chinese);
        onClick(genre);
        break;
      case 'other':
        setOther(!other);
        onClick(genre);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SelectableGenreBadge genre="japanese" selected={japanese} onClick={handleClick} />
      <SelectableGenreBadge genre="western" selected={western} onClick={handleClick} />
      <SelectableGenreBadge genre="chinese" selected={chinese} onClick={handleClick} />
      <SelectableGenreBadge genre="other" selected={other} onClick={handleClick} />
    </>
  );
};

export default MultipleGenreSelector;
