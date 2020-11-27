import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import AddButton from '../../components/atoms/AddButton';
import ContentHeader from '../../components/organisms/ContentHeader';
import CreateForm from '../../components/organisms/dishes/CreateForm';
import DishList from '../../components/organisms/dishes/DishList';
import { Dish } from '../../interfaces/domains/dish';

const IndexDish: React.FC = () => {
  const [reload, setReload] = useState<boolean>(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/dishes.json')
      .then((results) => {
        setDishes(results.data);
        setReload(false);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [reload]);

  const handleClose = (): void => (
    setShow(false)
  );

  const handleCreate = (): void => (
    setReload(true)
  );

  const handleNew = (): void => (
    setShow(true)
  );

  return (
    <>
      <CreateForm
        show={show}
        onClose={handleClose}
        onCreate={handleCreate}
      />
      <ContentHeader title="Dish">
        <RightContent>
          <AddButton onClick={handleNew} />
        </RightContent>
      </ContentHeader>
      <DishList dishes={dishes} />
    </>
  );
};

const RightContent = styled.div({
  display: 'flex',
  margin: 'auto',
  textAlign: 'right',
  width: '100%',
  justifyContent: 'flex-end',
});

export default withRouter(IndexDish);
