import React, { useContext } from 'react';
import {
  FormControl, FormGroup, Modal, Button, Form,
} from 'react-bootstrap';
import styled from 'styled-components';

import { Genre } from '../../../interfaces/domains/dish';
import { MenuCategory } from '../../../interfaces/domains/menu';
import SelectableGenreBadge from '../../atoms/SelectableGenreBadge';
import SelectableMenuBadge from '../../atoms/SelectableMenuBadge';
import { DishContext } from '../../pages/dishes/index';

const DishSearchModal: React.FC = () => {
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

  const handleClose = () => searchConditionDispatch({ type: 'close' });

  const handleReset = () => searchConditionDispatch({ type: 'reset' });

  const genreSelected = (genre: Genre): boolean => searchCondition.genres.includes(genre);
  const categorySelected = (category: MenuCategory): boolean => (
    searchCondition.categories.includes(category)
  );

  return (
    <Modal show={searchCondition.show} centered onHide={handleClose}>
      <Modal.Header closeButton>Search</Modal.Header>
      <Modal.Body>
        <FormGroup>
          <Form.Label>Genre</Form.Label>
          <GenreRow>
            <SelectableGenreBadge
              genre="japanese"
              selected={genreSelected('japanese')}
              onClick={handleGenreClick}
            />
            <SelectableGenreBadge
              genre="western"
              selected={genreSelected('western')}
              onClick={handleGenreClick}
            />
          </GenreRow>
          <GenreRow>
            <SelectableGenreBadge
              genre="chinese"
              selected={genreSelected('chinese')}
              onClick={handleGenreClick}
            />
            <SelectableGenreBadge
              genre="other"
              selected={genreSelected('other')}
              onClick={handleGenreClick}
            />
          </GenreRow>
        </FormGroup>
        <FormGroup>
          <Form.Label>Category</Form.Label>
          <CategoryRow>
            <SelectableMenuBadge
              category="main"
              selected={categorySelected('main')}
              onClick={handleCategoryClick}
            />
            <SelectableMenuBadge
              category="side"
              selected={categorySelected('side')}
              onClick={handleCategoryClick}
            />
          </CategoryRow>
          <CategoryRow>
            <SelectableMenuBadge
              category="dessert"
              selected={categorySelected('dessert')}
              onClick={handleCategoryClick}
            />
            <SelectableMenuBadge
              category="other"
              selected={categorySelected('other')}
              onClick={handleCategoryClick}
            />
          </CategoryRow>
        </FormGroup>
        <FormGroup>
          <Form.Label>Name</Form.Label>
          <NameForm
            placeholder="Name"
            alia-label="name"
            aria-describedby="name"
            onChange={handleChange}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleReset}>
          reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const GenreRow = styled.div({
  display: 'flex',
  marginBottom: 16,
  justifyContent: 'space-around',
});

const CategoryRow = styled.div({
  display: 'flex',
  marginBottom: 16,
  justifyContent: 'space-around',
});

const NameForm = styled(FormControl)({
  width: '100%',
  fontSize: 16,
});

export default DishSearchModal;
