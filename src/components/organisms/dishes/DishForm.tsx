// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

import GenreOption from '../../../enum/genre';
import { DraftDish, isGenre } from '../../../interfaces/domains/dish';
import { MenuCategory } from '../../../interfaces/domains/menu';
import FormInput from '../../molecules/FormInput';
import MenuCategorySelector from '../../molecules/MenuCategorySelector';
import ToggleSelector from '../../molecules/ToggleSelector';
import { DishContext } from '../../pages/dishes/index';
// import { DeviceContext } from '../../pages/Layout';

const DishForm: React.FC = () => {
  // const { isMobile } = useContext(DeviceContext);

  const { targetDish, dishDispatch } = useContext(DishContext);

  const [draftDish, setDraftDish] = useState<DraftDish>(targetDish);

  useEffect(() => {
    if (targetDish) setDraftDish(targetDish);
  }, [targetDish]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    dishDispatch({ type: 'edit', dish: { ...targetDish, name: event.target.value } })
  );

  const handleGenreSelect = (value: string): void => {
    if (isGenre(value)) dishDispatch({ type: 'edit', dish: { ...targetDish, genre: value } });
  };

  const handleCategorySelect = (value: MenuCategory): void => (
    dishDispatch({ type: 'edit', dish: { ...targetDish, category: value } })
  );

  return (
    <Form.Group>
      <Form.Label style={{ fontWeight: 'bold' }}>Dish</Form.Label>
      <FormItem style={{ marginBotton: 8 }}>
        <Label>Genre</Label>
        <ToggleSelector
          options={GenreOption}
          onChange={handleGenreSelect}
          selected={targetDish.genre}
        />
      </FormItem>
      <FormInput
        label="Name"
        value={draftDish.name}
        onChange={handleChange}
      />
      <FormItem style={{ marginBotton: 8 }}>
        <Label>Category</Label>
        <MenuCategorySelector
          onChange={handleCategorySelect}
          selected={targetDish.category}
        />
      </FormItem>
    </Form.Group>
  );
};

const FormItem = styled(Form.Group)`
  padding: 0 16px;
`;

const Label = styled(Form.Label)`
  display: block;
`;

export default DishForm;
