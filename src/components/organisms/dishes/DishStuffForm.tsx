import axios from 'axios';
import React, {
  createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import { Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import { StuffListAction, stuffListReducer } from '../../../reducers/stuff/list';
import Url from '../../../utils/api';
import DeleteButton from '../../atoms/DeleteButton';
import SubmitButton from '../../atoms/SubmitButton';
import { SelectItem } from '../../molecules/AutoFillSelector';
import FormAlert from '../../molecules/FormAlert';
import { DishContext } from '../../pages/dishes/index';
import { InfoContext } from '../../pages/Layout';

import DishForm from './DishForm';
import DishStuffsForm from './DishStuffsForm';

type Props = {
  onCreate: () => void;
}

export const DishStuffContext = createContext({} as {
  stuffList: SelectItem[];
  stuffListDispatch: React.Dispatch<StuffListAction>;
});

type ErrorMessages = {
  [key: string]: string[];
};

const DishStuffForm: React.FC<Props> = (props) => {
  const { onCreate } = props;
  const {
    targetDish, dishDispatch, dishModal, dishModalDispatch,
  } = useContext(DishContext);

  // const { isMobile } = useContext(DeviceContext);
  const { infoDispatch } = useContext(InfoContext);

  const [stuffList, stuffListDispatch] = useReducer(stuffListReducer, []);
  const [errors, setErrors] = useState<ErrorMessages[] | null>(null);

  useEffect(() => {
    axios.get(Url(['stuffs', 'stuff_list.json']))
      .then((results) => {
        const selectedStuffIds = targetDish.dishStuffs
          .filter((dishStuff) => (dishStuff.stuffId))
          .map((dishStuff) => (dishStuff.stuffId));
        const list: SelectItem[] = results.data;
        const filteredList: SelectItem[] = list.map((stuff) => (
          { ...stuff, selectable: !selectedStuffIds.includes(stuff.id) }
        ));
        stuffListDispatch({ type: 'set', value: filteredList });
      });
  }, [targetDish]);

  const handleClose = (): void => {
    dishDispatch({ type: 'reset' });
    dishModalDispatch({ type: 'close' });
    setErrors(null);
  };

  const handleSubmit = (): void => {
    const paths = targetDish.id ? ['dishes', targetDish.id.toString()] : ['dishes'];
    const method = targetDish.id ? 'put' : 'post';
    const context = method === 'put' ? '更新' : '登録';

    const newDishStuffs = targetDish.dishStuffs.filter((stuff) => (stuff.delete === false));

    axios.request({
      method,
      url: Url(paths),
      data: {
        dish: {
          name: targetDish.name,
          genre: targetDish.genre,
          category: targetDish.category,
          dish_stuffs: newDishStuffs,
        },
      },
    })
      .then((response) => {
        infoDispatch({
          type: 'set',
          value: {
            type: 'info',
            status: response.status,
            message: `${response.data.name}を${context}しました`,
          },
        });
        onCreate();
        handleClose();
      })
      .catch((error) => {
        const { messages } = error.response.data;
        setErrors([{ Dish: messages }]);
      });
  };

  const handleDelete = (): void => {
    if (!targetDish.id) return;
    axios.delete(Url(['dishes', targetDish.id.toString()]))
      .then((response) => {
        infoDispatch(
          {
            type: 'set',
            value: {
              type: 'info',
              status: response.status,
              message: `${response.data.name}を削除しました`,
            },
          },
        );
        onCreate();
      })
      .catch((error) => {
        const { messages } = error.response.data;
        setErrors([{ Dish: messages }]);
      });
  };

  const handleAlertClose = (): void => setErrors(null);

  return (
    <Modal show={dishModal.show} onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleAlertClose} />
      <Modal.Header closeButton>
        <Modal.Title>Create Dish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <DishForm />
          <DishStuffContext.Provider value={{ stuffList, stuffListDispatch }}>
            <DishStuffsForm />
          </DishStuffContext.Provider>
          <FormButtons />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton id={targetDish.id} onClick={handleSubmit} />
        { targetDish.id && <DeleteButton onClick={handleDelete} />}
      </Modal.Footer>
    </Modal>
  );
};

const FormButtons = styled.div`
  display: flex;
  padding-right: 16px;
  justify-content: flex-end;
`;

export default DishStuffForm;
