import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import styled from 'styled-components';

import DishStuffOption from '../../../enum/dish_stuff';
import { DraftDishStuff, isDishStuffCategory } from '../../../interfaces/domains/dish';
import DeleteIcon from '../../atoms/DeleteIcon';
import AutoFillSelector, { SelectItem } from '../../molecules/AutoFillSelector';
import { DishContext } from '../../pages/dishes';

import { DishStuffContext } from './DishStuffForm';

type Props = {
  stuff: DraftDishStuff
}

const DishStuffItemForm: React.FC<Props> = (props) => {
  const { stuff } = props;

  const { targetDish, dishDispatch } = useContext(DishContext);
  const { stuffList, stuffListDispatch } = useContext(DishStuffContext);

  const ref: React.RefObject<Typeahead<SelectItem>> = React.createRef();

  const handleCategorySelect = (value: string) => {
    const newDishStuffs = targetDish.dishStuffs;
    const category = isDishStuffCategory(value) ? value : null;
    if (category) {
      newDishStuffs[stuff.index] = {
        ...stuff,
        category,
      };
    }
    dishDispatch({ type: 'edit', dish: { ...targetDish, dishStuffs: newDishStuffs } });
  };

  const handleStuffSelect = (selected: SelectItem[]): void => {
    if (selected[0] === undefined) return;
    const newDishStuffs = targetDish.dishStuffs;
    newDishStuffs[stuff.index] = {
      ...stuff,
      stuffId: selected[0].id,
      stuffName: selected[0].name,
    };
    dishDispatch({ type: 'edit', dish: { ...targetDish, dishStuffs: newDishStuffs } });
    stuffListDispatch({ type: 'select', value: selected[0].id });
  };

  const handleInput = (): void => {
    const newDishStuffs = targetDish.dishStuffs;
    const prevId = newDishStuffs[stuff.index].stuffId;
    newDishStuffs[stuff.index] = {
      ...stuff,
      stuffId: null,
      stuffName: null,
    };
    dishDispatch({ type: 'edit', dish: { ...targetDish, dishStuffs: newDishStuffs } });
    stuffListDispatch({ type: 'delete', value: prevId });
  };

  const selectableStuff = (): SelectItem[] => stuffList.filter((item) => (item.selectable));

  const selectedStuff: SelectItem[] = (
    stuffList.filter((selectStuff) => selectStuff.id === stuff.stuffId)
  );

  const handleDelete = (event: React.MouseEvent<HTMLSpanElement>): void => {
    const newDishStuffs = targetDish.dishStuffs;
    newDishStuffs[stuff.index] = {
      ...stuff,
      stuffId: null,
      stuffName: null,
      delete: true,
    };
    dishDispatch({ type: 'edit', dish: { ...targetDish, dishStuffs: newDishStuffs } });
    stuffListDispatch({ type: 'delete', value: newDishStuffs[stuff.index].stuffId });
    const targetElement: HTMLElement | null = event.currentTarget.closest(`#stuff-${stuff.index}`);
    if (targetElement !== null) targetElement.hidden = true;
  };

  return (
    <StuffLine id={`stuff-${stuff.index}`} className="stuffs">
      <Form.Control
        as="select"
        onChange={(event) => handleCategorySelect(event.currentTarget.value)}
        style={{ width: 150 }}
        defaultValue={stuff.category || 'essential'}
      >
        {
          DishStuffOption.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))
        }
      </Form.Control>
      <AutoFillSelector
        ref={ref}
        onChange={handleStuffSelect}
        onInputChange={handleInput}
        options={selectableStuff()}
        selected={selectedStuff}
        style={{ width: 250, marginBottom: 0 }}
      />
      <DeleteIcon
        onClick={(event) => handleDelete(event)}
        style={{ marginLeft: 'auto' }}
      />
    </StuffLine>
  );
};

const StuffLine = styled.div`
  display: flex;
  padding: 2px 16px;
`;

export default DishStuffItemForm;
