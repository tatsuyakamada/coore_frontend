import { Dish } from '../../interfaces/domains/dish';

export type DishesAction = {
  type: 'fetch';
  value: Dish[] | null;
};

export const dishesReducer = (state: Dish[], action: DishesAction): Dish[] => {
  switch (action.type) {
    case 'fetch':
      if (action.value) {
        return action.value;
      }
      return state;
    default:
      return state;
  }
};
