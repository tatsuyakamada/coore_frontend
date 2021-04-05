import { ReactText } from 'react';

import { DishStuffCategories } from '../../enum/dish_stuff';
import { Genres } from '../../enum/genre';

import { MenuCategory } from './menu';

export interface Dish {
  id: number;
  name: string;
  genre: Genre;
  category: MenuCategory;
  createdAt: Date;
  updatedAt: Date;
  dishStuffs: DishStuff[];
}

export interface DishStuff {
  id: number;
  dishId: number;
  dishName: string;
  stuffId: number;
  stuffName: string;
  category: DishStuffCategory;
}

export interface DraftDish {
  id: number | null;
  name: string;
  genre: Genre;
  category: MenuCategory;
  dishStuffs: DraftDishStuff[];
}

export interface DraftDishStuff {
  id: number | null,
  index: number;
  stuffId: number | null,
  stuffName: string | null;
  category: DishStuffCategory | null;
  delete: boolean;
}

export interface DishItem {
  id: number;
  label: string;
  category: MenuCategory;
  selectable: boolean;
}

export type Genre = 'japanese' | 'western' | 'chinese' | 'other'

export type DishStuffCategory = 'essential' | 'desireble' | 'optional'

export const isGenre = (value: ReactText): value is Genre => (
  Object.keys(Genres).some((genre) => (genre === value))
);

export const isDishStuffCategory = (value: ReactText): value is DishStuffCategory => (
  Object.keys(DishStuffCategories).some((category) => (category === value))
);
