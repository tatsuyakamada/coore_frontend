export interface Dish {
  id: number;
  name: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DishHandleAttribute {
  name: string;
  genre: string;
}
