import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import axios from 'axios';
import React, {
  useEffect, useReducer, useState, createContext, useContext,
} from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { DishItem } from '../../../../interfaces/domains/dish';
import { DraftMenu } from '../../../../interfaces/domains/menu';
import { dishListReducer, DishListAction } from '../../../../reducers/dish/list';
import FormAlert from '../../../molecules/FormAlert';
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

  const {
    schedule,
    scheduleDispatch,
    scheduleModal,
    scheduleModalDispatch,
    menus,
    menusDispatch,
  } = useContext(ScheduledMenuContext);

  const [dishList, dishListDispatch] = useReducer(dishListReducer, []);

  const [errors, setErrors] = useState<errorMessages | null>(null);

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
      setErrors({ dishId: ['duplicated!'] });
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

    axios.request({
      method,
      url,
      data: formData,
    })
      .then(() => {
        onCreate();
        handleClose();
      })
      .catch((error) => {
        const response = error.response.data;
        setErrors({ error: [response.message] });
      });
  };

  const handleSubmit = (): void => {
    if (validateMenus()) submitSchedule();
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
          <FormButtons>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <SaveButton variant="primary" onClick={handleSubmit}>
              {schedule.id ? 'Update' : 'Save'}
            </SaveButton>
          </FormButtons>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const FormButtons = styled.div({
  display: 'flex',
  paddingRight: 16,
  justifyContent: 'flex-end',
});

const SaveButton = styled(Button)({
  marginLeft: 8,
});

export default ScheduledMenuForm;
