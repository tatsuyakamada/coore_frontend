import React from 'react';
import { Image } from 'react-bootstrap';

import { Image as ImageType } from '../../interfaces/domains/image';
import { isVertical } from '../../utils/image';

type Props = {
  image: ImageType;
  style?: React.CSSProperties;
};

const FormedImage: React.FC<Props> = (props) => {
  const { image, style } = props;

  const imageSize = (): React.CSSProperties => {
    const main = isVertical(image) ? 'height' : 'width';
    return { [main]: '100%' };
  };

  return <Image src={image.url} style={{ maxWidth: '100%', ...style, ...imageSize() }} />;
};

export default FormedImage;
