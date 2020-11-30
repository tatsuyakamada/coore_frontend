import { DraftDish } from '../../interfaces/domains/dish';

export type DishModal = {
  show: boolean;
};

export type DishModalAction = {
  type: 'open' | 'close';
};

export const dishModalReducer = (state: DishModal, action: DishModalAction): DishModal => {
  switch (action.type) {
    case 'open':
      return { show: true };
    case 'close':
      return { show: false };
    default:
      return state;
  }
};

export const initialDish: DraftDish = {
  id: null,
  genre: 'japanese',
  name: '',
};

export type DishAction = {
  type: 'new' | 'edit' | 'reset';
  dish?: DraftDish;
};

export const dishReducer = (state: DraftDish, action: DishAction): DraftDish => {
  switch (action.type) {
    case 'new':
      return initialDish;
    case 'edit':
      if (action.dish) {
        return action.dish;
      }
      return state;
    case 'reset':
      return initialDish;
    default:
      return state;
  }
};
