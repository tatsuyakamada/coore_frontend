import React, { useContext } from 'react';
import {
  Carousel, Card, Modal,
} from 'react-bootstrap';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import { Image } from '../../../interfaces/domains/image';
import { Menu, DraftMenu } from '../../../interfaces/domains/menu';
import { ScheduledMenu } from '../../../interfaces/domains/schedule';
import { hasVerticalImage } from '../../../utils/image';
import EditIcon from '../../atoms/EditIcon';
import MenuBadge from '../../atoms/MenuBadge';
import ScheduleBadge from '../../atoms/ScheduleBadge';
import FormedImage from '../../molecules/FormedImage';
import { DeviceContext } from '../../pages/Layout';
import { ScheduledMenuContext } from '../../pages/schedules/index';

type Props = {
  show: boolean;
  scheduledMenu: ScheduledMenu;
  onHide: () => void;
};

const ShowSchedule: React.FC<Props> = (props) => {
  const { show, scheduledMenu, onHide } = props;

  const { isMobile } = useContext(DeviceContext);

  const location = useLocation();

  const defaultImage = {
    id: 0,
    name: 'default',
    url: '/logo192.png',
    width: 400,
    height: 400,
  };

  const {
    scheduleDispatch,
    scheduleModalDispatch,
    menusDispatch,
  } = useContext(ScheduledMenuContext);

  const displayImages = (): Image[] => {
    const images = [...scheduleImages(), ...menuImages()];
    return images.length > 0 ? images : [defaultImage];
  };

  const scheduleImages = (): Image[] => {
    const { images } = scheduledMenu.schedule;
    return images ? images.reverse() : [];
  };

  const menuImages = (): Image[] => {
    const hasImageMenus: Menu[] = scheduledMenu.menus.filter((menu) => (
      menu.image !== undefined
    ));
    return hasImageMenus.map((menu) => (menu.image));
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

  const slideHeight = (): number => {
    if (isMobile) return hasVerticalImage(displayImages()) ? 330 : 210;
    return 480;
  };

  return (
    <Modal show={show} centered onHide={onHide} size="lg">
      <Card>
        <CardHeader>
          <div>{scheduledMenu.schedule.date}</div>
          <Type>
            <ScheduleBadge category={scheduledMenu.schedule.category} />
            {
              !location.state && <EditIcon onClick={handleEdit} />
            }
          </Type>
        </CardHeader>
        <ImageSlide indicators={false} style={{ height: slideHeight() }}>
          {
            displayImages().map((img) => (
              <Carousel.Item key={img.id}>
                <ImageItem>
                  <FormedImage image={img} style={{ maxHeight: slideHeight() }} />
                </ImageItem>
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
});

const ImageItem = styled.div({
  display: 'flex',
  justifyContent: 'center',
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
