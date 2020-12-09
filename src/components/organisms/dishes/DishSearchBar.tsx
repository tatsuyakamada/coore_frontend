import React, { useContext } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import { Genre } from '../../../interfaces/domains/dish';
import MultipleGenreSelector from '../../molecules/MultiGenreSelector';
import SearchBar from '../../molecules/SearchBar';
import { DishContext } from '../../pages/dishes/index';

const DishSearchBar: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(DishContext);

  const handleClick = (genre: Genre): void => (
    searchConditionDispatch({ type: 'genre', value: genre })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    searchConditionDispatch({ type: 'words', value: event.target.value })
  );

  const handleReset = () => (
    searchConditionDispatch({ type: 'reset' })
  );

  return (
    <SearchBar>
      <MultipleGenreSelector genres={searchCondition.genres} onClick={handleClick} />
      <div>
        <NameForm
          placeholder="Name"
          alia-label="name"
          aria-describedby="name"
          onChange={handleChange}
        />
      </div>
      <ResetButton onClick={handleReset}>
        reset
      </ResetButton>
    </SearchBar>
  );
};

const NameForm = styled(FormControl)({
  marginLeft: 30,
  width: 300,
  fontSize: 14,
});

const ResetButton = styled(Button)({
  display: 'flex',
  height: 35,
  marginLeft: 42,
  alignItems: 'center',
});

export default DishSearchBar;
