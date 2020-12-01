import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import { MenuCategories } from '../../enum/scheduled_menu_category';
import { MenuCategory } from '../../interfaces/domains/menu';
import { ScheduledMenu } from '../../interfaces/domains/schedule';
import ScheduleBadge from '../atoms/ScheduleBadge';
import ShowSchedule from '../organisms/schedules/ShowSchedule';

import MenuItem from './MenuItem';

type Props = {
  scheduledMenu: ScheduledMenu;
}

const ScheduleCard: React.FC<Props> = (props) => {
  const { scheduledMenu } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleClose = (): void => {
    setShowDetail(false);
  };

  const handleClick = (): void => {
    setShowDetail(true);
  };

  const displayImage = (): string => {
    if (scheduledMenu.schedule.images) return scheduledMenu.schedule.images[0].url;
    return menuImage() || '/logo192.png';
  };

  const menuImage = (): string | null => {
    const hasImageMenu = scheduledMenu.menus.find((menu) => (menu.image !== undefined));
    return hasImageMenu ? hasImageMenu.image.url : null;
  };

  const categolizedMenus = (key: MenuCategory): string => {
    const categolized = {
      main: '',
      side: '',
      dessert: '',
      other: '',
    };

    MenuCategories.forEach((category) => {
      categolized[category] = scheduledMenu.menus.filter((menu) => (
        menu.category === category
      )).map((menu) => (menu.dishName)).join('/');
    });
    return categolized[key];
  };

  return (
    <>
      <ShowSchedule
        show={showDetail}
        scheduledMenu={scheduledMenu}
        onHide={handleClose}
      />
      <Content
        key={scheduledMenu.schedule.id}
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
            MenuCategories.map((category) => (
              <MenuItem id={category} category={category} name={categolizedMenus(category)} />
            ))
          }
        </MenuList>
      </Content>
    </>
  );
};

const Content = styled(Card)({
  margin: 4,
  height: 300,
});

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

export default ScheduleCard;
