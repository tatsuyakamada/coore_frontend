import React, { useContext } from 'react';
import {
  Carousel, Card, Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import { Menu, DraftMenu } from '../../../interfaces/domains/menu';
import { ScheduledMenu } from '../../../interfaces/domains/schedule';
import { ScheduledMenuContext } from '../../../pages/schedules/index';
import EditIcon from '../../atoms/EditIcon';
import MenuBadge from '../../atoms/MenuBadge';
import ScheduleBadge from '../../atoms/ScheduleBadge';

type Props = {
  show: boolean;
  scheduledMenu: ScheduledMenu;
  onHide: () => void;
}

const ShowSchedule: React.FC<Props> = (props) => {
  const { show, scheduledMenu, onHide } = props;

  const {
    scheduleDispatch,
    scheduleModalDispatch,
    menusDispatch,
  } = useContext(ScheduledMenuContext);

  const displayImages = (): string[] => {
    const images = [...scheduleImages(), ...menuImages()];
    return images.length > 0 ? images : ['/logo192.png'];
  };

  const scheduleImages = (): string[] => {
    const { images } = scheduledMenu.schedule;
    return images ? images.map((image) => (image.url)).reverse() : [];
  };

  const menuImages = (): string[] => {
    const hasImageMenus: Menu[] = scheduledMenu.menus.filter((menu) => (
      menu.image !== undefined
    ));
    return hasImageMenus.map((menu) => (menu.image.url));
  };

  const translatedMenus = (): DraftMenu[] => {
    const newMenus: DraftMenu[] = [];
    scheduledMenu.menus.forEach((menu, index) => {
      newMenus.push({
        id: menu.id,
        index,
        dishId: menu.dishId,
        dishName: menu.dishName,
        category: menu.category,
        memo: menu.memo,
        image: null,
        deleteImage: menu.image ? { ...menu.image, delete: false } : null,
        delete: false,
      });
    });
    return newMenus;
  };

  const handleEdit = (): void => {
    scheduleDispatch({ type: 'edit', schedule: scheduledMenu.schedule });
    menusDispatch({
      type: 'set', menus: translatedMenus(), index: null, value: null,
    });
    scheduleModalDispatch({ type: 'open' });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Card>
        <CardHeader>
          <div>
            {scheduledMenu.schedule.date}
          </div>
          <Type>
            <ScheduleBadge category={scheduledMenu.schedule.category} />
            <EditIcon onClick={handleEdit} />
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
  display: 'flex',
  marginLeft: 'auto',
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
