import React, { useState } from 'react';
import styled from 'styled-components';

import { Image } from '../../../interfaces/domains/image';
import FormedImage from '../../molecules/FormedImage';
import ImageModal from '../../molecules/ImageModal';
import ContentSubHeader from '../ContentSubHeader';

type Props = {
  images: Image[];
}

const DishImages: React.FC<Props> = (props) => {
  const { images } = props;

  const [image, setImage] = useState<Image | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleHide = (): void => setShow(false);

  const handleImageClick = (targetImage: Image): void => {
    setImage(targetImage);
    setShow(true);
  };

  return (
    <>
      <ImageModal show={show} image={image} onHide={handleHide} />
      <Images>
        <ContentSubHeader subtitle="Images" />
        <ImageCards>
          {
            images.map((img) => (
              <ImageCard key={img.id} onClick={() => handleImageClick(img)}>
                <FormedImage
                  image={img}
                  style={{ maxHeight: 200, maxWidth: 280 }}
                />
              </ImageCard>
            ))
          }
        </ImageCards>
      </Images>
    </>
  );
};

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

export default DishImages;
