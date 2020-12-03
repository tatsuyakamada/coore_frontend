import React from 'react';
import { Image } from 'react-bootstrap';

import { Image as ImageType } from '../../interfaces/domains/image';

type Props = {
  image: ImageType;
  style?: React.CSSProperties;
};

const FormedImage: React.FC<Props> = (props) => {
  const { image, style } = props;

  const imageSize = (): React.CSSProperties => {
    const main = image.width > image.height ? 'width' : 'height';
    return { [main]: '100%' };
  };

  return <Image src={image.url} style={{ ...style, ...imageSize() }} />;
};

export default FormedImage;
