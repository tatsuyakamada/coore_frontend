import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardDeck } from 'react-bootstrap';
import styled from 'styled-components';

import AddButton from '../../components/atoms/AddButton';
import ScheduleItem from '../../components/molecules/ScheduleItem';
import ContentHeader from '../../components/organisms/ContentHeader';
import CreateForm from '../../components/organisms/schedules/CreateForm';
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

  const handleNew = () => (
    setShow(true)
  );

  return (
    <>
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
      <Cards>
        {
          scheduledMenus.map((scheduledMenu) => (
            <ScheduleItem
              key={scheduledMenu.schedule.id}
              scheduledMenu={scheduledMenu}
            />
          ))
        }
      </Cards>
    </>
  );
};

const Cards = styled(CardDeck)({
  margin: 0,
});

const RightContent = styled.div({
  display: 'flex',
  margin: 'auto',
  width: '100%',
  justifyContent: 'flex-end',
});

export default IndexSchedule;
