import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, CardGroup } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import styled from 'styled-components';

import ContentHeader from '../../components/ContentHeader';
import ScheduleItem from '../../components/ScheduleItem';
import CreateForm from '../../components/schedules/CreateForm';
import { ScheduledMenu } from '../../interfaces/domains/schedule';

const IndexSchedule: React.FC = () => {
  const [scheduledMenus, setScheduledMenus] = useState<ScheduledMenu[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/schedules.json')
      .then((results) => {
        setScheduledMenus(results.data);
      });
  }, [reload]);

  return (
    <>
      <CreateForm
        show={show}
        onClose={() => { setShow(false); }}
        onCreate={() => { setReload(true); }}
      />
      <ContentHeader title="Schedule">
        <RightContent>
          <Button variant="info" onClick={() => { setShow(true); }}>
            <span>
              <AiFillPlusCircle />
            </span>
          </Button>
        </RightContent>
      </ContentHeader>
      <CardGroup>
        {
          scheduledMenus.map((scheduledMenu) => (
            <ScheduleItem
              key={scheduledMenu.schedule.id}
              scheduledMenu={scheduledMenu}
            />
          ))
        }
      </CardGroup>
    </>
  );
};

const RightContent = styled.div({
  margin: 'auto',
  textAlign: 'right',
  width: '100%',
});

export default IndexSchedule;
