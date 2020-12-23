import React, { useContext } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import { Genre } from '../../../interfaces/domains/dish';
import { MenuCategory } from '../../../interfaces/domains/menu';
import MultipleGenreSelector from '../../molecules/MultiGenreSelector';
import MultiMenuCategorySelector from '../../molecules/MultiMenuCategorySelector';
import SearchBar from '../../molecules/SearchBar';
import { DishContext } from '../../pages/dishes/index';

const DishSearchBar: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(DishContext);

  const handleGenreClick = (genre: Genre): void => (
    searchConditionDispatch({ type: 'genre', value: genre })
  );

  const handleCategoryClick = (category: MenuCategory): void => (
    searchConditionDispatch({ type: 'category', value: category })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    searchConditionDispatch({ type: 'words', value: event.target.value })
  );

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  return (
    <SearchBar>
      <Form.Group>
        <Label>Genre</Label>
        <MultipleGenreSelector
          genres={searchCondition.genres}
          onClick={handleGenreClick}
        />
      </Form.Group>
      <CategorySelect>
        <Label>Category</Label>
        <MultiMenuCategorySelector
          categories={searchCondition.categories}
          onClick={handleCategoryClick}
        />
      </CategorySelect>
      <NameForm>
        <Label>Name</Label>
        <NameInput
          placeholder="Name"
          alia-label="name"
          aria-describedby="name"
          onChange={handleChange}
        />
      </NameForm>
      <ResetButton onClick={handleReset}>
        reset
      </ResetButton>
    </SearchBar>
  );
};

const CategorySelect = styled(Form.Group)({
  marginLeft: 20,
});

const NameForm = styled(Form.Group)({
  marginLeft: 30,
});

const Label = styled(Form.Label)({
  display: 'block',
  marginBottom: 4,
  fontSize: 12,
});

const NameInput = styled(FormControl)({
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
