import axios from 'axios';
import React, {
  createContext, useState, useEffect, useReducer,
} from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import GenreBadge from '../../components/atoms/GenreBadge';
import FormedImage from '../../components/molecules/FormedImage';
import ImageModal from '../../components/molecules/ImageModal';
import ContentSubHeader from '../../components/organisms/ContentSubHeader';
import ScheduleList from '../../components/organisms/schedules/ScheduleList';
import { Dish } from '../../interfaces/domains/dish';
import { Image } from '../../interfaces/domains/image';
import { ScheduledMenu, DraftSchedule } from '../../interfaces/domains/schedule';
import {
  initialSchedule, scheduleReducer, ScheduleAction,
} from '../../reducers/schedule/scheduleForm';

export const ScheduledMenuContext = createContext({} as {
  schedule: DraftSchedule;
  scheduleDispatch: React.Dispatch<ScheduleAction>;
});

const ShowDish: React.FC = () => {
  const [schedule, scheduleDispatch] = useReducer(scheduleReducer, initialSchedule);

  const [dish, setDish] = useState<Dish | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [scheduledMenus, setScheduledMenus] = useState<ScheduledMenu[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [image, setImage] = useState<Image | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`http://localhost:3100/api/v1/dishes/${id}.json`)
      .then((result) => {
        setDish(result.data.dish);
        setImages(result.data.images);
        setScheduledMenus(result.data.schedules);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleImageClick = (targetImage: Image): void => {
    setImage(targetImage);
    setShow(true);
  };

  const handleHide = (): void => (
    setShow(false)
  );

  return (
    <>
      {
        dish && (
          <>
            <ImageModal show={show} image={image} onHide={handleHide} />
            <DishLabel>
              <GenreBadge
                genre={(dish && dish.genre) || 'japanese'}
                style={{ height: 30, width: 120, fontSize: 18 }}
              />
              <Name>{dish.name}</Name>
            </DishLabel>
            <Images>
              <ContentSubHeader subtitle="Images" />
              <ImageCards>
                {
                  images.map((img) => (
                    <ImageCard onClick={() => handleImageClick(img)}>
                      <FormedImage image={img} style={{ maxHeight: 200, maxWidth: 280 }} />
                    </ImageCard>
                  ))
                }
              </ImageCards>
            </Images>
            <ScheduledMenuContext.Provider value={{ schedule, scheduleDispatch }}>
              <History>
                <ContentSubHeader subtitle="History" />
                <ScheduleList scheduledMenus={scheduledMenus} />
              </History>
            </ScheduledMenuContext.Provider>
          </>
        )
      }
    </>
  );
};

const DishLabel = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
});

const Name = styled.span({
  marginLeft: 12,
  fontSize: 20,
  fontWeight: 'bold',
});

const Images = styled.div({
  marginTop: 12,
});

const ImageCards = styled.div({
  display: 'flex',
});

const ImageCard = styled.div({
  display: 'flex',
  margin: 8,
  justifyContent: 'center',
  alignItems: 'center',
});

const History = styled.div({
  marginTop: 12,
});

export default ShowDish;
