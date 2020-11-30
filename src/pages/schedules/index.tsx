import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import React, {
  useEffect, useReducer, useState, createContext,
} from 'react';
import styled from 'styled-components';

import AddButton from '../../components/atoms/AddButton';
import ContentHeader from '../../components/organisms/ContentHeader';
import ScheduledMenuForm from '../../components/organisms/schedules/ScheduledMenuForm';
import ScheduleList from '../../components/organisms/schedules/ScheduleList';
import { DraftMenu } from '../../interfaces/domains/menu';
import { ScheduledMenu, DraftSchedule } from '../../interfaces/domains/schedule';
import { MenusAction, menusReducer } from '../../reducers/menu';
import { ScheduledMenusAction, scheduledmenusReducer } from '../../reducers/schedule/scheduledMenus';
import {
  scheduleReducer, initialSchedule, scheduleModalReducer,
  ScheduleModal, ScheduleAction, ScheduleModalAction,
} from '../../reducers/schedule/scheduleForm';

export const ScheduledMenuContext = createContext({} as {
  scheduledMenus: ScheduledMenu[];
  scheduledMenusDispatch: React.Dispatch<ScheduledMenusAction>;
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
  scheduleModal: ScheduleModal;
  scheduleModalDispatch: React.Dispatch<ScheduleModalAction>;
  menus: DraftMenu[];
  menusDispatch: React.Dispatch<MenusAction>;
});

const IndexSchedule: React.FC = () => {
  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);
  const [scheduledMenus, scheduledMenusDispatch] = useReducer(scheduledmenusReducer, []);
  const [scheduleModal, scheduleModalDispatch] = useReducer(scheduleModalReducer, { show: false });
  const [menus, menusDispatch] = useReducer(menusReducer, []);

  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/schedules.json')
      .then((results) => {
        scheduledMenusDispatch({ type: 'fetch', value: results.data });
        setReload(false);
      })
      .catch((data) => {
        console.log(data);
      });
  }, [reload]);

  const handleNew = ():void => {
    scheduleDispatch({ type: 'new' });
    scheduleModalDispatch({ type: 'open' });
  };

  return (
    <ScheduledMenuContext.Provider value={{
      scheduledMenus,
      scheduledMenusDispatch,
      schedule,
      scheduleDispatch,
      scheduleModal,
      scheduleModalDispatch,
      menus,
      menusDispatch,
    }}
    >
      <ScheduledMenuForm onCreate={() => setReload(true)} />
      <ContentHeader title="Schedule">
        <RightContent>
          <AddButton onClick={handleNew} />
        </RightContent>
      </ContentHeader>
      <ScheduleList />
    </ScheduledMenuContext.Provider>
  );
};

const RightContent = styled.div({
  display: 'flex',
  margin: 'auto',
  width: '100%',
  justifyContent: 'flex-end',
});

export default IndexSchedule;
