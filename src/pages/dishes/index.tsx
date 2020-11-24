import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import ContentHeader from '../../components/ContentHeader';
import CreateForm from '../../components/dishes/CreateForm';
import DishList from '../../components/DishList';
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

  const showModal = (): void => {
    setShow(true);
  };

  const handleClose = (): void => {
    setShow(false);
  };

  const handleCreate = (): void => {
    setReload(true);
  };

  return (
    <>
      <CreateForm
        show={show}
        onClose={handleClose}
        onCreate={handleCreate}
      />
      <ContentHeader title="Dish">
        <RightContent>
          <Button variant="info" onClick={showModal}>
            <AiFillPlusCircle />
          </Button>
        </RightContent>
      </ContentHeader>
      <DishList dishes={dishes} />
    </>
  );
};

const RightContent = styled.div({
  margin: 'auto',
  textAlign: 'right',
  width: '100%',
});

export default withRouter(IndexDish);
