import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillPlusCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { Button, CardGroup } from 'react-bootstrap';
import ContentHeader from '../../components/ContentHeader';
import CreateForm from '../../components/schedules/CreateForm';
import ScheduleItem from '../../components/ScheduleItem';
import { ScheduledMenu } from '../../interfaces/domains/schedule';
import 'react-bootstrap-typeahead/css/Typeahead.css';

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
          scheduledMenus.map((scheduledMenu) => {
            return <ScheduleItem scheduledMenu={scheduledMenu} />;
          })
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
