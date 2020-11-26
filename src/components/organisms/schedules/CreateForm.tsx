import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import axios from 'axios';
import React, {
  useEffect, useReducer, useState, createContext,
} from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { DishItem } from '../../../interfaces/domains/dish';
import { DraftMenu } from '../../../interfaces/domains/menu';
import { DraftSchedule } from '../../../interfaces/domains/schedule';
import { dishListReducer, DishListAction } from '../../../reducers/dish/list';
import { MenusAction, menusReducer } from '../../../reducers/menu';
import { initialSchedule, ScheduleAction, scheduleReducer } from '../../../reducers/schedule';
import FormAlert from '../../molecules/FormAlert';

import MenuForm from './MenusForm';
import ScheduleForm from './ScheduleForm';

type Props = {
  show: boolean;
  onClose: () => void;
  onCreate: () => void;
};

type errorMessages = {
  [key: string]: string[];
};

export const ScheduleContext = createContext({} as {
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
});

export const MenusContext = createContext({} as {
  menus: DraftMenu[];
  menusDispatch: React.Dispatch<MenusAction>;
  dishList: DishItem[];
  dishListDispatch: React.Dispatch<DishListAction>;
});

const CreateForm: React.FC<Props> = (props) => {
  const { show, onClose, onCreate } = props;

  const [errors, setErrors] = useState<errorMessages | null>(null);

  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);
  const [menus, menusDispatch] = useReducer(menusReducer, []);
  const [dishList, dishListDispatch] = useReducer(dishListReducer, []);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/dishes/dish_list.json')
      .then((results) => {
        dishListDispatch({ type: 'set', value: results.data });
      });
  }, []);

  const handleClose = (): void => {
    scheduleDispatch({ type: 'reset', value: null });
    menusDispatch({ type: 'reset', index: null, value: null });
    setErrors(null);
    onClose();
  };

  const validateMenus = (): boolean => (
    duplicateDish()
  );

  const duplicateDish = (): boolean => {
    const filteredMenus = menus.filter((menu) => (menu.dishId !== null));
    const dishIds = filteredMenus.map((menu) => (menu.dishId));
    const uniqueIds = new Set(dishIds);
    return dishIds.length === uniqueIds.size;
  };

  const createSchedule = (): void => {
    const formData: FormData = new FormData();
    formData.append('scheduledMenu[schedule][date]', schedule.date.toLocaleDateString());
    formData.append('scheduledMenu[schedule][category]', schedule.category);
    formData.append('scheduledMenu[schedule][memo]', schedule.memo);

    if (schedule.images !== null) {
      Array.from(schedule.images).forEach((image) => {
        formData.append('scheduledMenu[schedule][images][]', image);
      });
    }

    const filteredMenus: DraftMenu[] = menus.filter((menu) => (
      menu.dishId && menu.delete === false
    ));

    filteredMenus.forEach((menu) => {
      if (menu.dishId) formData.append(`scheduledMenu[menus][${menu.index}][dish_id]`, menu.dishId.toString());
      formData.append(`scheduledMenu[menus][${menu.index}][category]`, menu.category);
      if (menu.image) formData.append(`scheduledMenu[menus][${menu.index}][image]`, menu.image);
    });

    axios.post('http://localhost:3100/api/v1/schedules', formData)
      .then(() => {
        onCreate();
        handleClose();
      })
      .catch((error) => { console.log(error); });
  };

  const handleSubmit = (): void => {
    if (validateMenus()) {
      createSchedule();
    } else {
      setErrors({ dishId: ['duplicated!'] });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <FormAlert messages={errors} onClose={() => { setErrors(null); }} />
      <Modal.Header closeButton>
        <Modal.Title>Create Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ScheduleContext.Provider value={{ schedule, scheduleDispatch }}>
            <ScheduleForm />
          </ScheduleContext.Provider>
          <MenusContext.Provider
            value={{
              menus, menusDispatch, dishList, dishListDispatch,
            }}
          >
            <MenuForm />
          </MenusContext.Provider>
          <FormButtons>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <SaveButton variant="primary" onClick={handleSubmit}>
              Save
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

export default CreateForm;
