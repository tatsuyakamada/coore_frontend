import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import { MenuCategories } from '../../enum/scheduled_menu_category';
import { Image } from '../../interfaces/domains/image';
import { MenuCategory, isMenuCategory } from '../../interfaces/domains/menu';
import { ScheduledMenu } from '../../interfaces/domains/schedule';
import ScheduleBadge from '../atoms/ScheduleBadge';
import ShowSchedule from '../organisms/schedules/ShowSchedule';

import FormedImage from './FormedImage';
import MenuItem from './MenuItem';

type Props = {
  scheduledMenu: ScheduledMenu;
};

const ScheduleCard: React.FC<Props> = (props) => {
  const { scheduledMenu } = props;

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleClose = (): void => setShowDetail(false);

  const handleClick = (): void => setShowDetail(true);

  const defaultImage = {
    id: 0,
    name: 'default',
    url: '/logo192.png',
    width: 400,
    height: 400,
  };

  const displayImage = (): Image => {
    if (scheduledMenu.schedule.images) return scheduledMenu.schedule.images[0];
    return menuImage() || defaultImage;
  };

  const menuImage = (): Image | null => {
    const hasImageMenu = scheduledMenu.menus.find((menu) => (!menu.image));
    return hasImageMenu ? hasImageMenu.image : null;
  };

  const categolizedMenus = (key: MenuCategory): string => {
    const categolized = {
      main: '',
      side: '',
      dessert: '',
      other: '',
    };

    Object.keys(MenuCategories).forEach((category) => {
      if (isMenuCategory(category)) {
        categolized[category] = scheduledMenu.menus.filter((menu) => (
          menu.category === category
        )).map((menu) => (menu.dishName)).join('/');
      }
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
          <FormedImage image={displayImage()} />
        </ScheduleImage>
        <MenuList>
          {
            Object.keys(MenuCategories).map((category) => (
              isMenuCategory(category)
              && (
                <MenuItem
                  key={category}
                  id={category}
                  category={category}
                  name={categolizedMenus(category)}
                />
              )
            ))
          }
        </MenuList>
      </Content>
    </>
  );
};

const Content = styled(Card)({
  height: 300,
  width: 320,
  margin: 4,
});

const CardHeader = styled(Card.Header)({
  display: 'flex',
  padding: 8,
  alignItems: 'center',
});

const Type = styled.div({
  marginLeft: 'auto',
});

const ScheduleImage = styled.div({
  display: 'flex',
  width: '100%',
  height: 150,
  justifyContent: 'center',
});

const MenuList = styled(Card.Body)({
  padding: 8,
});

export default ScheduleCard;
