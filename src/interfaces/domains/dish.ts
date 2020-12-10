import { ReactText } from 'react';

import { Genres } from '../../enum/genre';

import { MenuCategory } from './menu';

export interface Dish {
  id: number;
  name: string;
  genre: Genre;
  category: MenuCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface DraftDish {
  id: number | null;
  name: string;
  genre: Genre;
  category: MenuCategory;
}

export interface DishItem {
  id: number;
  label: string;
  category: MenuCategory;
  selectable: boolean;
}

export type Genre = 'japanese' | 'western' | 'chinese' | 'other'

export const isGenre = (value: ReactText): value is Genre => (
  Object.keys(Genres).some((genre) => (genre === value))
);
