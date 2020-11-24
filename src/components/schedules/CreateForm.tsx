import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import axios from 'axios';
import React, { useReducer, useState, createContext } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { DraftMenu } from '../../interfaces/domains/menu';
import { DraftSchedule } from '../../interfaces/domains/schedule';
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

type ScheduleAction = {
  type: keyof DraftSchedule | 'reset';
  value: DraftSchedule[keyof DraftSchedule] | null;
};

const scheduleReducer = (scheduleState: DraftSchedule, action: ScheduleAction): DraftSchedule => {
  switch (action.type) {
    case 'date':
      if (action.value instanceof Date) {
        return { ...scheduleState, date: action.value };
      }
      return scheduleState;
    case 'category':
      if (typeof action.value === 'string') {
        return { ...scheduleState, category: action.value };
      }
      return scheduleState;
    case 'image':
      if (action.value instanceof File) {
        return { ...scheduleState, image: action.value };
      }
      return scheduleState;
    case 'reset':
      return { date: new Date(), category: 'dinner', image: null };
    default:
      return scheduleState;
  }
};

type menusAction = {
  type: keyof DraftMenu | 'add' | 'delete' |'reset';
  index: number | null;
  value: DraftMenu[keyof DraftMenu] | null;
};

const menusReducer = (selectedMenuState: DraftMenu[], action: menusAction) => {
  const newSelectedMenus = selectedMenuState;
  if (action.index !== null) {
    switch (action.type) {
      case 'dishId':
        if (typeof action.value === 'number') {
          newSelectedMenus[action.index].dishId = action.value;
        }
        return newSelectedMenus;
      case 'category':
        if (typeof action.value === 'string') {
          newSelectedMenus[action.index].category = action.value;
        }
        return newSelectedMenus;
      case 'image':
        if (typeof action.value === 'string') {
          newSelectedMenus[action.index].image = action.value;
        }
        return newSelectedMenus;
      case 'delete':
        newSelectedMenus[action.index].delete = true;

        return newSelectedMenus;
      default:
        return selectedMenuState;
    }
  } else {
    switch (action.type) {
      case 'add':
        return newSelectedMenus.concat({
          id: null,
          index: selectedMenuState.length,
          dishId: 1,
          category: 'main',
          image: null,
          delete: false,
        });
      case 'reset':
        return [{
          id: null,
          index: 0,
          dishId: null,
          category: 'main',
          image: null,
          delete: false,
        }];
      default:
        return selectedMenuState;
    }
  }
};

export const ScheduleContext = createContext({} as {
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
});

export const MenusContext = createContext({} as {
  menus: DraftMenu[];
  menusDispatch: React.Dispatch<menusAction>;
});

const CreateForm: React.FC<Props> = (props) => {
  const { show, onClose, onCreate } = props;

  const initialSchedule: DraftSchedule = {
    date: new Date(),
    category: 'dinner',
    image: null,
  };

  const initialSelectedMenus: DraftMenu[] = [
    {
      id: null,
      index: 0,
      dishId: 1,
      category: 'main',
      image: null,
      delete: false,
    },
  ];

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
    if (schedule.image) formData.append('scheduledMenu[schedule][image]', schedule.image);
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
  const [menus, menusDispatch] = useReducer(menusReducer, initialSelectedMenus);

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
