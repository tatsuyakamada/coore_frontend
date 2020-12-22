import React from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';

import { StuffRelations } from '../../../interfaces/domains/stuff';

import ListIndicator from './StuffListIndicator';

type Props = {
  categories: StuffRelations[]
}

const StuffList: React.FC<Props> = (props) => {
  const { categories } = props;

  return (
    <ListGroup as="ul">
      <Accordion>
        {
          categories.map((category) => (
            <ListIndicator element={category} />
          ))
        }
      </Accordion>
    </ListGroup>
  );
};

export default StuffList;
