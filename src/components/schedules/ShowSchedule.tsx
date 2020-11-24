import React from 'react';
import {
  Badge, Carousel, Card, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { Menu, ScheduledMenu } from '../../interfaces/domains/schedule';

type Props = {
  show: boolean;
  scheduledMenu: ScheduledMenu;
  onHide: () => void;
}

const ShowSchedule: React.FC<Props> = (props) => {
  const { show, scheduledMenu, onHide } = props;

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

  const displayImages = (): string[] => {
    const images = [...menuImages()];
    if (scheduledMenu.schedule.image) images.unshift(scheduledMenu.schedule.image);
    return images.length > 0 ? images : ['/logo192.png'];
  };

  const menuImages = (): string[] => {
    const hasImageMenus: Menu[] = scheduledMenu.menus.filter((menu) => (
      menu.image !== null
    ));
    return hasImageMenus.map((menu) => (menu.image));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Card>
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
        <ImageSlide indicators="false">
          {
            displayImages().map((img) => (
              <Carousel.Item>
                <Img src={img} />
              </Carousel.Item>
            ))
          }
        </ImageSlide>
        <CardBody>
          <Card.Title>Menu</Card.Title>
          {
            scheduledMenu.menus.map((menu) => (
              <MenuNames key={menu.id}>
                <div>
                  <MenuCategory
                    pill
                    variant={menuCategolize(menu.category)}
                  >
                    {menu.category}
                  </MenuCategory>
                </div>
                <DishName>{menu.dishName}</DishName>
              </MenuNames>
            ))
          }
        </CardBody>
      </Card>
    </Modal>
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

const MenuNames = styled.div({
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

const ImageSlide = styled(Carousel)({
  width: '100%',
  height: 300,
});

const Img = styled.img({
  width: '100%',
  maxHeight: '300px',
});

export default ShowSchedule;
