import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import axios from 'axios';
import React, { useReducer, useState, createContext } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { DraftMenu } from '../../interfaces/domains/menu';
import { DraftSchedule } from '../../interfaces/domains/schedule';
import { initialMenus, MenusAction, menusReducer } from '../../reducers/menu';
import { initialSchedule, ScheduleAction, scheduleReducer } from '../../reducers/schedule';
import FormAlert from '../FormAlert';

import MenusForm from './MenusForm';
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
});

const CreateForm: React.FC<Props> = (props) => {
  const { show, onClose, onCreate } = props;

  const [errors, setErrors] = useState<errorMessages | null>(null);

  const handleSubmit = (): void => {
    if (validateMenus()) {
      createSchedule();
    } else {
      setErrors({ dishId: ['duplicated!'] });
    }
  };

  const createSchedule = (): void => {
    const formData: FormData = new FormData();
    formData.append('scheduledMenu[schedule][date]', schedule.date.toLocaleDateString());
    formData.append('scheduledMenu[schedule][category]', schedule.category);
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

  const validateMenus = (): boolean => {
    const filteredMenus = menus.filter((menu) => (menu.dishId !== null));
    const dishIds = filteredMenus.map((menu) => (menu.dishId));
    const uniqueIds = new Set(dishIds);
    return dishIds.length === uniqueIds.size;
  };

  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);
  const [menus, menusDispatch] = useReducer(menusReducer, initialMenus);

  const handleClose = (): void => {
    menusDispatch({ type: 'reset', index: null, value: null });
    setErrors(null);
    onClose();
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
          <MenusContext.Provider value={{ menus, menusDispatch }}>
            <MenusForm />
          </MenusContext.Provider>
          <FormButtons>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </FormButtons>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const FormButtons = styled.div({
  display: 'flex',
  width: '90%',
  justifyContent: 'flex-end',
});

export default CreateForm;
