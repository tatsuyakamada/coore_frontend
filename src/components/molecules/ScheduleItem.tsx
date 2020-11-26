import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import { ScheduledMenu } from '../../interfaces/domains/schedule';
import ScheduleBadge from '../atoms/ScheduleBadge';
import ShowSchedule from '../organisms/schedules/ShowSchedule';

import MenuItem from './MenuItem';

type Props = {
  scheduledMenu: ScheduledMenu;
}

const ScheduleItem: React.FC<Props> = (props) => {
  const { scheduledMenu } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const displayImage = (): string => {
    if (scheduledMenu.schedule.images) {
      return scheduledMenu.schedule.images[0];
    }
    return menuImage() || '/logo192.png';
  };

  const menuImage = (): string | null => {
    const hasImageMenu = scheduledMenu.menus.find((menu) => (menu.image !== null));
    return hasImageMenu ? hasImageMenu.image : null;
  };

  const handleClick = () => {
    setShowDetail(true);
  };

  const handleClose = () => {
    setShowDetail(false);
  };

  return (
    <>
      <ShowSchedule
        show={showDetail}
        scheduledMenu={scheduledMenu}
        onHide={handleClose}
      />
      <Card
        key={scheduledMenu.schedule.id}
        style={{ margin: 4, minWidth: '24%', maxWidth: '24%' }}
        onClick={handleClick}
      >
        <CardHeader>
          <div>{scheduledMenu.schedule.date}</div>
          <Type>
            <ScheduleBadge category={scheduledMenu.schedule.category} />
          </Type>
        </CardHeader>
        <ScheduleImage>
          <Card.Img style={{ maxHeight: '100%', maxWidth: '100%' }} src={displayImage()} />
        </ScheduleImage>
        <MenuList>
          {
            scheduledMenu.menus.map((menu) => (
              <MenuItem id={menu.id} category={menu.category} name={menu.dishName} />
            ))
          }
        </MenuList>
      </Card>
    </>
  );
};

const CardHeader = styled(Card.Header)({
  display: 'flex',
  padding: 8,
});

const Type = styled.div({
  marginLeft: 'auto',
});

const ScheduleImage = styled.div({
  width: '100%',
  height: 150,
});

const MenuList = styled(Card.Body)({
  padding: 8,
});

export default ScheduleItem;
