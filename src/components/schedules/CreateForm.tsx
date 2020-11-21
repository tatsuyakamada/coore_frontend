import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import {
  Button, Form, InputGroup, Modal,
} from 'react-bootstrap';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import styled from 'styled-components';
import FormAlert from '../FormAlert';
import Selector from '../Selector';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import ScheduleCategory from '../../enum/schedule_category';
import ScheduledMenuCategory from '../../enum/scheduled_menu_category';

type Props = {
  show: boolean;
  onClose: () => void;
  onCreate: () => void;
};

type errorMessages = {
  [key: string]: string[];
};

type draftSchedule = {
  date: Date,
  category: string,
  image: string | null,
};

type draftMenu = {
  id: number | null,
  index: number,
  dish_id: number,
  category: string,
  image: string | null,
  delete: boolean,
};

type Dish = {
  id: number,
  label: string,
  selectable: boolean,
};

const CreateForm: React.FC<Props> = (props) => {
  const { show, onClose, onCreate } = props;

  const initialSchedule = {
    date: new Date(),
    category: 'dinner',
    image: null,
  };

  const initialSelectedMenus = [
    {
      id: null,
      index: 0,
      dish_id: 1,
      category: 'main',
      image: null,
      delete: false,
    },
  ];

  const defaultSelectedDay = (): DayValue => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  };

  const [schedule, setSchedule] = useState<draftSchedule>(initialSchedule);
  const [errors, setErrors] = useState<errorMessages | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayValue>(defaultSelectedDay);
  const [selectedMenus, setSelectedMenus] = useState<draftMenu[]>(initialSelectedMenus);
  const [dishList, setDishList] = useState<Dish[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/dishes/dish_list.json')
      .then((results) => {
        setDishList(results.data);
      });
  }, []);

  const handleSubmit = (): void => {
    if (validateMenus()) {
      createSchedule();
    } else {
      setErrors({ dish_id: ['duplicated!'] });
    }
  };

  const createSchedule = (): void => {
    const formData = new FormData();
    formData.append('scheduledMenu[schedule][date]', schedule.date.toLocaleDateString());
    formData.append('scheduledMenu[schedule][category]', schedule.category);
    if (schedule.image) formData.append('scheduledMenu[schedule][image]', schedule.image);
    const filteredMenus = selectedMenus.filter((menu) => { return menu.delete === false; });
    filteredMenus.forEach((menu) => {
      formData.append(`scheduledMenu[menus][${menu.index}][dish_id]`, menu.dish_id.toString());
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
    const dishIds = selectedMenus.map((menu) => (menu.dish_id));
    const uniqueIds = new Set(dishIds);
    return dishIds.length === uniqueIds.size;
  };

  const handleClose = (): void => {
    setSchedule(initialSchedule);
    setSelectedMenus(initialSelectedMenus);
    resetSelectableDish();
    setErrors(null);
    onClose();
  };

  const renderCustomInput = ({ ref }: any) => {
    return (
      <DateSelector
        ref={ref}
        value={schedule.date.toLocaleDateString()}
      />
    );
  };

  const handleDateSelect = (value: DayValue | null): void => {
    setSelectedDay(value);
    setSchedule({
      date: value ? new Date(value.year, value.month - 1, value.day) : schedule.date,
      category: schedule.category,
      image: schedule.image,
    });
  };

  const handleScheduleCategorySelect = (event: any): void => {
    setSchedule({
      date: schedule.date,
      category: event.target.value,
      image: schedule.image,
    });
  };

  const handleSelectImage = (event: any): void => {
    setSchedule({
      date: schedule.date,
      category: schedule.category,
      image: event.target.files[0],
    });
  };

  const ScheduledMenuCategorySelect = (event: any, menu: draftMenu): void => {
    const newSelectedMenus = selectedMenus;
    newSelectedMenus[menu.index] = {
      id: menu.id,
      index: menu.index,
      dish_id: selectedMenus[menu.index].dish_id,
      category: event.target.value,
      image: menu.image,
      delete: menu.delete,
    };
    setSelectedMenus(newSelectedMenus);
  };

  const handleSelectedMenu = (selected: any, menu: draftMenu): void => {
    if (selected[0] !== undefined) {
      const newSelectedMenus = selectedMenus;
      newSelectedMenus[menu.index] = {
        id: menu.id,
        index: menu.index,
        dish_id: selected[0].id,
        category: selectedMenus[menu.index].category,
        image: menu.image,
        delete: menu.delete,
      };
      setSelectedMenus(newSelectedMenus);
      const newDishList = dishList;
      newDishList.forEach((dish, index) => {
        if (dish.id === selected[0].id) {
          newDishList[index].selectable = false;
        }
      });
      setDishList(newDishList);
      reconstructDishList(selected[0].id, false);
    }
  };

  const deleteSelectedMenu = (event: any, menu: draftMenu): void => {
    event.target.closest(`#menu-${menu.index}`).hidden = true;
    const newSelectedMenus = selectedMenus;
    newSelectedMenus[menu.index] = {
      id: menu.id,
      index: menu.index,
      dish_id: menu.dish_id,
      category: menu.category,
      image: menu.image,
      delete: true,
    };
    setSelectedMenus(newSelectedMenus);
    reconstructDishList(menu.dish_id, true);
  };

  const reconstructDishList = (targetId: number | null, selectable: boolean): void => {
    const newDishList = dishList;
    newDishList.forEach((dish, index) => {
      if (dish.id === targetId) {
        newDishList[index].selectable = selectable;
      }
    });
    setDishList(newDishList);
  };

  const selectableDish: Dish[] = (
    dishList.filter((dish) => { return dish.selectable === true; })
  );

  const resetSelectableDish = (): void => {
    const newDishList = dishList;
    newDishList.forEach((dish) => { dish.selectable = true; });
    setDishList(newDishList);
  };

  const addMenu = (): void => {
    const index = selectedMenus.length;
    setSelectedMenus(selectedMenus.concat({
      id: null, index, dish_id: 1, category: 'main', image: null, delete: false,
    }));
  };

  const handleSelectMenuImage = (event: any, menu: draftMenu) => {
    const newSelectedMenus = selectedMenus;
    newSelectedMenus[menu.index] = {
      id: menu.id,
      index: menu.index,
      dish_id: menu.dish_id,
      category: menu.category,
      image: event.target.files[0],
      delete: menu.delete,
    };
    setSelectedMenus(newSelectedMenus);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <FormAlert messages={errors} onClose={() => { setErrors(null); }} />
      <Modal.Header closeButton>
        <Modal.Title>Create Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Schedule</Form.Label>
            <InputGroup style={{ width: '70%' }}>
              <InputGroup.Prepend>
                <InputLabel id="date">Date</InputLabel>
              </InputGroup.Prepend>
              <DatePicker
                value={selectedDay}
                onChange={(value) => { handleDateSelect(value); }}
                renderInput={renderCustomInput} // render a custom input
                shouldHighlightWeekends
              />
            </InputGroup>
            <InputGroup style={{ width: '70%' }}>
              <InputGroup.Prepend>
                <InputLabel id="scheduleCategory">Category</InputLabel>
              </InputGroup.Prepend>
              <Selector
                options={ScheduleCategory}
                onChange={handleScheduleCategorySelect}
              />
            </InputGroup>
            <input
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleSelectImage}
            />
          </Form.Group>
          <MenuForm>
            <MenuFormLabel>
              <div>
                <Form.Label>Menu</Form.Label>
              </div>
              <AddButton variant="outline-info" onClick={addMenu}>
                <AiFillPlusCircle style={{ marginTop: -16 }} />
              </AddButton>
            </MenuFormLabel>
            {
              selectedMenus.map((selectMenu) => {
                const ref: any = React.createRef();
                return (
                  <InputGroup key={selectMenu.index} id={`menu-${selectMenu.index.toString()}`}>
                    <InputGroup style={{ width: '25%' }}>
                      <Selector
                        options={ScheduledMenuCategory}
                        onChange={(event) => { ScheduledMenuCategorySelect(event, selectMenu); }}
                      />
                    </InputGroup>
                    <Typeahead
                      id={selectMenu.index}
                      ref={ref}
                      onChange={(selected) => { handleSelectedMenu(selected, selectMenu); }}
                      options={selectableDish}
                    />
                    <FileUploadIcon>
                      <label
                        htmlFor={`menu-image-${selectMenu.index.toString()}`}
                        style={{ margin: 0 }}
                      >
                        <BiImageAdd style={{ width: '25px', height: '25px' }} />
                        <input
                          type="file"
                          id={`menu-image-${selectMenu.index.toString()}`}
                          accept="image/*"
                          multiple={false}
                          onChange={(event) => { handleSelectMenuImage(event, selectMenu); }}
                          hidden
                        />
                      </label>
                    </FileUploadIcon>
                    <DeleteIcon onClick={(event) => { deleteSelectedMenu(event, selectMenu); }}>
                      <AiFillMinusCircle />
                    </DeleteIcon>
                  </InputGroup>
                );
              })
            }
          </MenuForm>
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

const InputLabel = styled(InputGroup.Text)({
  width: 100,
});

const DateSelector = styled(Form.Control)({
  width: '118%',
});

const MenuForm = styled(Form.Group)({
  marginTop: 20,
  width: '90%',
});

const MenuFormLabel = styled.div({
  display: 'flex',
});

const AddButton = styled(Button)({
  marginLeft: 'auto',
  marginRight: 26,
  height: 25,
});

const FileUploadIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: '#509aea',
  cursor: 'pointer',
});

const DeleteIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 10,
  color: '#dc3545',
  cursor: 'pointer',
});

const FormButtons = styled.div({
  display: 'flex',
  width: '90%',
  justifyContent: 'flex-end',
});

export default CreateForm;
