export interface Dish {
  id: number;
  name: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DraftDish {
  name: string;
  genre: string;
}

export interface DishItem {
  id: number,
  label: string,
  selectable: boolean,
}
