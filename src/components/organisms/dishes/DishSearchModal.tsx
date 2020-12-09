import React, { useContext } from 'react';
import { FormControl, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { Genre } from '../../../interfaces/domains/dish';
import SelectableGenreBadge from '../../atoms/SelectableGenreBadge';
import { DishContext } from '../../pages/dishes/index';

const DishSearchModal: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(DishContext);

  const handleClick = (genre: Genre): void => (
    searchConditionDispatch({ type: 'genre', value: genre })
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    searchConditionDispatch({ type: 'words', value: event.target.value })
  );

  const handleClose = () => (
    searchConditionDispatch({ type: 'close' })
  );

  const handleReset = () => (
    searchConditionDispatch({ type: 'reset' })
  );

  const selected = (genre: Genre): boolean => searchCondition.genres.includes(genre);

  return (
    <Modal show={searchCondition.show} centered onHide={handleClose}>
      <Modal.Header closeButton>Search</Modal.Header>
      <Modal.Body>
        <BadgeRow>
          <SelectableGenreBadge
            genre="japanese"
            selected={selected('japanese')}
            onClick={handleClick}
          />
          <SelectableGenreBadge
            genre="western"
            selected={selected('western')}
            onClick={handleClick}
          />
        </BadgeRow>
        <BadgeRow>
          <SelectableGenreBadge
            genre="chinese"
            selected={selected('chinese')}
            onClick={handleClick}
          />
          <SelectableGenreBadge
            genre="other"
            selected={selected('other')}
            onClick={handleClick}
          />
        </BadgeRow>
        <div>
          <NameForm
            placeholder="Name"
            alia-label="name"
            aria-describedby="name"
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleReset}>
          reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const BadgeRow = styled.div({
  display: 'flex',
  marginBottom: 16,
  justifyContent: 'space-around',
});

const NameForm = styled(FormControl)({
  width: '100%',
  fontSize: 14,
});

export default DishSearchModal;
