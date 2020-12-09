import React, { useContext } from 'react';
import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import { DishContext } from '../../../pages/dishes/index';
import MultipleGenreSelector from '../../molecules/MultiGenreSelector';
import SearchBar from '../../molecules/SearchBar';

const DishSearchBar: React.FC = () => {
  const { searchConditionDispatch } = useContext(DishContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    searchConditionDispatch({ type: 'words', value: event.target.value })
  );

  return (
    <SearchBar>
      <MultipleGenreSelector />
      <div>
        <NameForm
          placeholder="Name"
          alia-label="name"
          aria-describedby="name"
          onChange={handleChange}
        />
      </div>
    </SearchBar>
  );
};

const NameForm = styled(FormControl)({
  marginLeft: 30,
  width: 300,
  fontSize: 14,
});

export default DishSearchBar;
