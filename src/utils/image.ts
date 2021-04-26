import { Image } from '../interfaces/domains/image';

export const isVertical = (image: Image): boolean => (
  image.height >= image.width
);

export const hasVerticalImage = (images: Image[]): boolean => (
  images.some((image) => (isVertical(image)))
);
