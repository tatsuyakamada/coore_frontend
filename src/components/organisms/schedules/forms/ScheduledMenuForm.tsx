import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import axios from 'axios';
import React, {
  createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import { Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import { DishItem } from '../../../../interfaces/domains/dish';
import { DraftMenu } from '../../../../interfaces/domains/menu';
import { DishListAction, dishListReducer } from '../../../../reducers/dish/list';
import DeleteButton from '../../../atoms/DeleteButton';
import SubmitButton from '../../../atoms/SubmitButton';
import FormAlert from '../../../molecules/FormAlert';
import { InfoContext } from '../../../pages/Layout';
import { ScheduledMenuContext } from '../../../pages/schedules/index';

import MenuForm from './MenusForm';
import ScheduleForm from './ScheduleForm';

type Props = {
  onCreate: () => void;
};

type errorMessages = {
  [key: string]: string[];
};

export const MenusContext = createContext({} as {
  dishList: DishItem[];
  dishListDispatch: React.Dispatch<DishListAction>;
});

const ScheduledMenuForm: React.FC<Props> = (props) => {
  const { onCreate } = props;

  const { infoDispatch } = useContext(InfoContext);

  const {
    schedule,
    scheduleDispatch,
    scheduleModal,
    scheduleModalDispatch,
    menus,
    menusDispatch,
  } = useContext(ScheduledMenuContext);

  const [dishList, dishListDispatch] = useReducer(dishListReducer, []);

  const [errors, setErrors] = useState<errorMessages[] | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/dishes/dish_list.json')
      .then((results) => {
        dishListDispatch({ type: 'set', value: results.data });
      });
  }, []);

  const handleClose = (): void => {
    scheduleDispatch({ type: 'reset' });
    menusDispatch({ type: 'reset', index: null, value: null });
    scheduleModalDispatch({ type: 'close' });
    setErrors(null);
  };

  const handleAlertClose = (): void => setErrors(null);

  const validateMenus = (): boolean => duplicateDish();

  const duplicateDish = (): boolean => {
    const filteredMenus = menus.filter((menu) => (menu.dishId !== null && menu.delete !== true));
    const dishIds = filteredMenus.map((menu) => (menu.dishId));
    const uniqueIds = new Set(dishIds);
    if (dishIds.length !== uniqueIds.size) {
      setErrors([{ dishId: ['duplicated!'] }]);
      return false;
    }
    return true;
  };

  const submitSchedule = (): void => {
    const formData: FormData = new FormData();

    if (schedule.id) formData.append('scheduledMenu[schedule][id]', schedule.id.toString());
    formData.append('scheduledMenu[schedule][date]', new Date(schedule.date).toLocaleDateString());
    formData.append('scheduledMenu[schedule][category]', schedule.category);
    formData.append('scheduledMenu[schedule][memo]', schedule.memo);

    if (schedule.deleteImages) {
      schedule.deleteImages.filter((image) => (image.delete)).forEach((image) => (
        formData.append('scheduledMenu[schedule][delete_images][]', image.id.toString())
      ));
    }

    if (schedule.images) {
      Array.from(schedule.images).forEach((image) => (
        formData.append('scheduledMenu[schedule][images][]', image)
      ));
    }

    const filteredMenus: DraftMenu[] = menus.filter((menu) => (
      menu.dishId && !menu.delete
    ));

    filteredMenus.forEach((menu) => {
      formData.append(`scheduledMenu[menus][0${menu.index}][id]`, menu.id ? menu.id.toString() : '');
      if (menu.dishId) formData.append(`scheduledMenu[menus][0${menu.index}][dish_id]`, menu.dishId.toString());
      formData.append(`scheduledMenu[menus][0${menu.index}][category]`, menu.category);
      if (menu.image) formData.append(`scheduledMenu[menus][0${menu.index}][image]`, menu.image);
      if (menu.deleteImage && menu.deleteImage.delete) formData.append(`scheduledMenu[menus][0${menu.index}][delete_image]`, menu.deleteImage.id.toString());
    });

    const baseUrl = 'http://localhost:3100/api/v1/schedules';
    const url = schedule.id ? baseUrl.concat(`/${schedule.id}`) : baseUrl;
    const method = schedule.id ? 'put' : 'post';
    const methodMessage = method === 'put' ? '更新' : '登録';

    axios.request({
      method,
      url,
      data: formData,
    })
      .then((response) => {
        infoDispatch({
          type: 'set',
          value: {
            type: 'info',
            status: response.status,
            message: `${response.data.date}の${response.data.category}を${methodMessage}しました`,
          },
        });
        onCreate();
        handleClose();
      })
      .catch((error) => {
        const response = error.response.data;
        setErrors([{ error: [response.message] }]);
      });
  };

  const handleSubmit = (): void => {
    if (validateMenus()) submitSchedule();
  };

  const handleDelete = (): void => {
    axios.delete(`http://localhost:3100/api/v1/schedules/${schedule.id}`)
      .then((response) => {
        infoDispatch(
          {
            type: 'set',
            value: {
              type: 'info',
              status: response.status,
              message: `${response.data.date}の${response.data.category}を削除しました`,
            },
          },
        );
        handleClose();
        onCreate();
      })
      .catch((error) => (
        error.response.data.messages.map((message: string) => (
          infoDispatch({
            type: 'set',
            value: {
              type: 'error',
              status: error.response.status,
              message,
            },
          })
        ))
      ));
  };

  return (
    <Modal show={scheduleModal.show} centered onHide={handleClose}>
      <FormAlert messages={errors} onClose={handleAlertClose} />
      <Modal.Header closeButton>
        <Modal.Title>Create Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ScheduleForm />
          <MenusContext.Provider value={{ dishList, dishListDispatch }}>
            <MenuForm />
          </MenusContext.Provider>
          <FormButtons />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton id={schedule.id} onClick={handleSubmit} />
        { schedule.id && <DeleteButton onClick={handleDelete} />}
      </Modal.Footer>
    </Modal>
  );
};

const FormButtons = styled.div({
  display: 'flex',
  paddingRight: 16,
  justifyContent: 'flex-end',
});

export default ScheduledMenuForm;
