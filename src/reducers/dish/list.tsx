import { DishItem } from '../../interfaces/domains/dish';

export type DishListAction = {
  type: 'set' | 'select' | 'delete';
  value: DishItem[] | number | null;
  prev?: number;
};

export const dishListReducer = (state: DishItem[], action: DishListAction): DishItem[] => {
  const newState = state;
  switch (action.type) {
    case 'set':
      return action.value && typeof action.value !== 'number' ? action.value : [];
    case 'select':
      newState.forEach((dish, index) => {
        if (action.value && dish.id === action.value) newState[index].selectable = false;
        if (dish.id === action.prev) newState[index].selectable = true;
      });
      return newState;
    case 'delete':
      if (action.value !== null) {
        newState.forEach((dish, index) => {
          if (dish.id === action.value) {
            newState[index].selectable = true;
          }
        });
      }
      return newState;
    default:
      return state;
  }
};
