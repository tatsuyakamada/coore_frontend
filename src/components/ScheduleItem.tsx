import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import styled from 'styled-components';

import { ScheduledMenu } from '../interfaces/domains/schedule';

import ShowSchedule from './schedules/ShowSchedule';

type Props = {
  scheduledMenu: ScheduledMenu;
}

const ScheduleItem: React.FC<Props> = (props) => {
  const { scheduledMenu } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const scheduleCategolize = (): string => {
    switch (scheduledMenu.schedule.category) {
      case 'morning':
        return 'primary';
      case 'lunch':
        return 'success';
      case 'dinner':
        return 'warning';
      case 'brunch':
        return 'info';
      default:
        return 'light';
    }
  };

  const menuCategolize = (category: string): string => {
    switch (category) {
      case 'main':
        return 'danger';
      case 'side':
        return 'success';
      case 'dessert':
        return 'info';
      case 'other':
        return 'secondary';
      default:
        return 'light';
    }
  };

  const displayImage = (): string => {
    if (scheduledMenu.schedule.image) {
      return scheduledMenu.schedule.image;
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
        key={`show-${scheduledMenu.schedule.id}`}
        show={showDetail}
        scheduledMenu={scheduledMenu}
        onHide={handleClose}
      />
      <Card
        key={scheduledMenu.schedule.id}
        style={{ minWidth: '13.5rem', maxWidth: '13.5rem' }}
        onClick={handleClick}
      >
        <CardHeader>
          <Date>
            {scheduledMenu.schedule.date}
          </Date>
          <Type>
            <ScheduleCategory pill variant={scheduleCategolize()}>
              {scheduledMenu.schedule.category}
            </ScheduleCategory>
          </Type>
        </CardHeader>
        <CardImage>
          <Card.Img style={{ maxHeight: '100%', maxWidth: '100%' }} src={displayImage()} />
        </CardImage>
        <CardBody>
          {
            scheduledMenu.menus.map((menu) => (
              <Menu key={menu.id}>
                <div>
                  <MenuCategory
                    pill
                    variant={menuCategolize(menu.category)}
                  >
                    {menu.category}
                  </MenuCategory>
                </div>
                <DishName>{menu.dishName}</DishName>
              </Menu>
            ))
          }
        </CardBody>
      </Card>
    </>
  );
};

const CardHeader = styled(Card.Header)({
  display: 'flex',
  padding: 8,
});

const Date = styled.div({

});

const Type = styled.div({
  marginLeft: 'auto',
});

const Menu = styled.div({
  display: 'flex',
});

const ScheduleCategory = styled(Badge)({
  margin: 'auto',
});

const CardBody = styled(Card.Body)({
  padding: 8,
});

const MenuCategory = styled(Badge)({
  margin: 'auto',
});

const DishName = styled(Card.Text)({
  paddingLeft: 8,
});

const CardImage = styled.div({
  width: '100%',
  height: 150,
});

export default ScheduleItem;
