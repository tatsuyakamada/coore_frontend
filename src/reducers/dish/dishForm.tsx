import { DraftDish } from '../../interfaces/domains/dish';

export type DishFormProps = {
  show: boolean;
  dish: DraftDish;
};

export const initialDish: DraftDish = {
  id: null,
  genre: 'japanese',
  name: '',
};

export const initialDishFormProps: DishFormProps = {
  show: false,
  dish: initialDish,
};

export type DishFormAction = {
  type: 'new' | 'edit' | 'cancel';
  value: {
    show: boolean;
    dish: DraftDish | null;
  };
}

export const dishReducer = (state: DishFormProps, action: DishFormAction): DishFormProps => {
  switch (action.type) {
    case 'new':
      return { ...state, show: true };
    case 'edit':
      if (action.value.dish) {
        return { ...state, show: true, dish: action.value.dish };
      }
      return initialDishFormProps;
    case 'cancel':
      return { ...state, show: false, dish: initialDish };
    default:
      return initialDishFormProps;
  }
};
