import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

import { DraftDishStuff } from '../../../interfaces/domains/dish';
import AddButton from '../../atoms/AddButton';
import { DishContext } from '../../pages/dishes';

import DishStuffItemForm from './DishStuffItemForm';

const DishStuffsForm: React.FC = () => {
  const { targetDish, dishDispatch } = useContext(DishContext);

  const initialDishStuff: DraftDishStuff = {
    id: null,
    index: targetDish.dishStuffs.length,
    stuffId: null,
    stuffName: '',
    category: 'essential',
    delete: false,
  };

  const handleAdd = () => {
    dishDispatch({ type: 'edit', dish: { ...targetDish, dishStuffs: [...targetDish.dishStuffs, initialDishStuff] } });
  };

  return (
    <StuffsForm>
      <FormHeader>
        <Label>DishSuffs</Label>
        <AddButton onClick={handleAdd} height={25} width={40} />
      </FormHeader>
      { targetDish.dishStuffs.map((stuff) => <DishStuffItemForm stuff={stuff} />) }
    </StuffsForm>
  );
};

const StuffsForm = styled(Form.Group)`
  margin-top: 20px;
`;

const FormHeader = styled.div`
  display: flex;
`;

const Label = styled(Form.Label)`
  font-weight: bold;
  margin-right: 16px;
`;

export default DishStuffsForm;
