import React, { useContext } from 'react';
import { FormControl, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

import { DishContext } from '../../../pages/dishes/index';
import SelectableGenreBadge from '../../atoms/SelectableGenreBadge';

const DishSearchModal: React.FC = () => {
  const { searchCondition, searchConditionDispatch } = useContext(DishContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => (
    searchConditionDispatch({ type: 'words', value: event.target.value })
  );

  const handleClose = () => (
    searchConditionDispatch({ type: 'close' })
  );

  const handleReset = () => (
    searchConditionDispatch({ type: 'reset' })
  );

  return (
    <Modal show={searchCondition.show} centered onHide={handleClose}>
      <Modal.Header closeButton>Search</Modal.Header>
      <Modal.Body>
        <BadgeRow>
          <SelectableGenreBadge genre="japanese" />
          <SelectableGenreBadge genre="western" />
        </BadgeRow>
        <BadgeRow>
          <SelectableGenreBadge genre="chinese" />
          <SelectableGenreBadge genre="other" />
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
