import { ReactText } from 'react';

import { Genres } from '../../enum/genre';

export interface Dish {
  id: number;
  name: string;
  genre: Genre;
  createdAt: Date;
  updatedAt: Date;
}

export interface DraftDish {
  name: string;
  genre: Genre;
}

export interface DishItem {
  id: number,
  label: string,
  selectable: boolean,
}

export type Genre = 'japanese' | 'western' | 'chinese' | 'other'

export const isGenre = (value: ReactText): value is Genre => (
  Genres.some((genre) => (genre === value))
);
