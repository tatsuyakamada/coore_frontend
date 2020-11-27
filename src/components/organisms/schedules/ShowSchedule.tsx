import React from 'react';
import {
  Badge, Carousel, Card, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { Menu } from '../../../interfaces/domains/menu';
import { ScheduledMenu } from '../../../interfaces/domains/schedule';
import MenuBadge from '../../atoms/MenuBadge';

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

  const displayImages = (): string[] => {
    const images = [...menuImages()];
    if (scheduledMenu.schedule.images) images.unshift(...scheduledMenu.schedule.images);
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
          <div>
            {scheduledMenu.schedule.date}
          </div>
          <Type>
            <ScheduleCategoryOption pill variant={scheduleCategolize()}>
              {scheduledMenu.schedule.category}
            </ScheduleCategoryOption>
          </Type>
        </CardHeader>
        <ImageSlide indicators={false}>
          {
            displayImages().map((img) => (
              <Carousel.Item key={img}>
                <Img src={img} />
              </Carousel.Item>
            ))
          }
        </ImageSlide>
        <ScheduleContent>
          {
            scheduledMenu.schedule.memo
            && (
              <>
                <MemoTitle>~Memo~</MemoTitle>
                <MemoText>{scheduledMenu.schedule.memo}</MemoText>
              </>
            )
          }
          <Card.Title>Menu</Card.Title>
          {
            scheduledMenu.menus.map((menu) => (
              <MenuList key={menu.id}>
                <MenuBadge category={menu.category} />
                <DishName>{menu.dishName}</DishName>
              </MenuList>
            ))
          }
        </ScheduleContent>
      </Card>
    </Modal>
  );
};

const CardHeader = styled(Card.Header)({
  display: 'flex',
  padding: 8,
});

const Type = styled.div({
  marginLeft: 'auto',
});

const ScheduleCategoryOption = styled(Badge)({
  margin: 'auto',
});

const ImageSlide = styled(Carousel)({
  width: '100%',
  height: 300,
});

const Img = styled.img({
  width: '100%',
  maxHeight: '300px',
});

const ScheduleContent = styled(Card.Body)({
  padding: 8,
});

const MemoTitle = styled(Card.Title)({
  fontSize: 18,
});

const MemoText = styled(Card.Text)({
  padding: '0 16px',
});

const MenuList = styled.div({
  display: 'flex',
  marginBottom: 8,
  paddingLeft: 16,
});

const DishName = styled(Card.Text)({
  paddingLeft: 8,
});

export default ShowSchedule;
