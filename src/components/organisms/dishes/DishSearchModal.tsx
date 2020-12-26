import React, { useContext } from 'react';
import {
  Button, Form, FormGroup, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { GenreOptionWithColor } from '../../../enum/genre';
import { MenuCategoryOptionWithColor } from '../../../enum/scheduled_menu_category';
import { isGenre } from '../../../interfaces/domains/dish';
import { isMenuCategory } from '../../../interfaces/domains/menu';
import FormInput from '../../molecules/FormInput';
import SelectableBadge, { Option } from '../../molecules/SelectableBadge';
import { DishContext } from '../../pages/dishes/index';

const DishSearchModal: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(DishContext);

  const handleGenreClick = (genre: string): void => (
    searchConditionDispatch({ type: 'genre', value: genre })
  );

  const handleCategoryClick = (category: string): void => (
    searchConditionDispatch({ type: 'category', value: category })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    searchConditionDispatch({ type: 'words', value: event.target.value })
  );

  const handleClose = () => searchConditionDispatch({ type: 'close' });

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  const genreSelected = (genre: string): boolean => (
    isGenre(genre) && searchCondition.genres.includes(genre)
  );

  const categorySelected = (category: string): boolean => (
    isMenuCategory(category) && searchCondition.categories.includes(category)
  );

  const GenreBadge = (option: Option) => (
    <SelectableBadge
      option={option}
      selected={genreSelected(option.value)}
      onClick={handleGenreClick}
    />
  );

  const CategoryBadge = (option: Option) => (
    <SelectableBadge
      option={option}
      selected={categorySelected(option.value)}
      onClick={handleCategoryClick}
    />
  );

  return (
    <Modal show={searchCondition.show} centered onHide={handleClose}>
      <Modal.Header closeButton>Search</Modal.Header>
      <Modal.Body>
        <FormGroup>
          <Form.Label>Genre</Form.Label>
          <BadgeRow>
            {GenreBadge(GenreOptionWithColor[0])}
            {GenreBadge(GenreOptionWithColor[1])}
          </BadgeRow>
          <BadgeRow>
            {GenreBadge(GenreOptionWithColor[2])}
            {GenreBadge(GenreOptionWithColor[3])}
          </BadgeRow>
        </FormGroup>
        <FormGroup>
          <Form.Label>Category</Form.Label>
          <BadgeRow>
            {CategoryBadge(MenuCategoryOptionWithColor[0])}
            {CategoryBadge(MenuCategoryOptionWithColor[1])}
          </BadgeRow>
          <BadgeRow>
            {CategoryBadge(MenuCategoryOptionWithColor[2])}
            {CategoryBadge(MenuCategoryOptionWithColor[3])}
          </BadgeRow>
        </FormGroup>
        <FormInput
          label="Name"
          value=""
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleReset}>
          reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const BadgeRow = styled.div`
display: flex;
  margin-bottom: 16px;
  justify-content: space-around;
`;

export default DishSearchModal;
