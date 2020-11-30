import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import React, {
  useEffect, useReducer, useState, createContext,
} from 'react';
import styled from 'styled-components';

import AddButton from '../../components/atoms/AddButton';
import ContentHeader from '../../components/organisms/ContentHeader';
import CreateForm from '../../components/organisms/schedules/CreateForm';
import ScheduleList from '../../components/organisms/schedules/ScheduleList';
import { ScheduledMenu } from '../../interfaces/domains/schedule';
import { ScheduledMenusAction, scheduledmenusReducer } from '../../reducers/schedule/scheduledMenus';

export const ScheduledMenuContext = createContext({} as {
  scheduledMenus: ScheduledMenu[];
  scheduledMenusDispatch: React.Dispatch<ScheduledMenusAction>
});

const IndexSchedule: React.FC = () => {
  const [scheduledMenus, scheduledMenusDispatch] = useReducer(scheduledmenusReducer, []);

  const [reload, setReload] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

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

  const handleNew = () => (
    setShow(true)
  );

  return (
    <ScheduledMenuContext.Provider value={{ scheduledMenus, scheduledMenusDispatch }}>
      <CreateForm
        show={show}
        onClose={() => { setShow(false); }}
        onCreate={() => { setReload(true); }}
      />
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
