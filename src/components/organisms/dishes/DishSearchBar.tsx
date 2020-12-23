import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

import { GenreOptionWithColor } from '../../../enum/genre';
import { MenuCategoryOptionWithColor } from '../../../enum/scheduled_menu_category';
import { isGenre } from '../../../interfaces/domains/dish';
import { isMenuCategory } from '../../../interfaces/domains/menu';
import FormInput from '../../molecules/FormInput';
import SearchBar from '../../molecules/SearchBar';
import SelectableBadge from '../../molecules/SelectableBadge';
import { DishContext } from '../../pages/dishes/index';

const DishSearchBar: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(DishContext);

  const handleGenreClick = (genre: string): void => {
    searchConditionDispatch({ type: 'genre', value: genre });
  };

  const handleCategoryClick = (category: string): void => (
    searchConditionDispatch({ type: 'category', value: category })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    searchConditionDispatch({ type: 'words', value: event.target.value })
  );

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  const genreSelected = (genre: string): boolean => (
    isGenre(genre) && searchCondition.genres.includes(genre)
  );

  const categorySelected = (category: string): boolean => (
    isMenuCategory(category) && searchCondition.categories.includes(category)
  );

  return (
    <SearchBar>
      <Form.Group>
        <Label>Genre</Label>
        {
          GenreOptionWithColor.map((option) => (
            <SelectableBadge
              key={option.value}
              option={option}
              selected={genreSelected(option.value)}
              onClick={handleGenreClick}
            />
          ))
        }
      </Form.Group>
      <CategorySelect>
        <Label>Category</Label>
        {
          MenuCategoryOptionWithColor.map((option) => (
            <SelectableBadge
              key={option.value}
              option={option}
              selected={categorySelected(option.value)}
              onClick={handleCategoryClick}
            />
          ))
        }
      </CategorySelect>
      <FormInput
        label="Name"
        value=""
        onChange={handleChange}
        style={{ marginLeft: 30, width: 300, fontSize: 14 }}
        labelStyle={{ marginBottom: 4, fontSize: 12 }}
      />
      <ResetButton onClick={handleReset}>
        reset
      </ResetButton>
    </SearchBar>
  );
};

const CategorySelect = styled(Form.Group)({
  marginLeft: 20,
});

const Label = styled(Form.Label)({
  display: 'block',
  marginBottom: 4,
  fontSize: 12,
});

const ResetButton = styled(Button)({
  display: 'flex',
  height: 35,
  marginLeft: 42,
  alignItems: 'center',
});

export default DishSearchBar;
