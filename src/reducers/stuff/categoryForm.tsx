import { DraftCategory } from '../../interfaces/domains/stuff';

export type CategoryModal = {
  show: boolean;
};

export type CategoryModalAction = {
  type: 'open' | 'close';
};

export const categoryModalReducer = (
  state: CategoryModal,
  action: CategoryModalAction,
): CategoryModal => {
  switch (action.type) {
    case 'open':
      return { show: true };
    case 'close':
      return { show: false };
    default:
      return state;
  }
};

export const initialCategory: DraftCategory = {
  id: null,
  name: '',
};

export type CategoryAction = {
  type: 'new' | 'edit' | 'reset';
  category?: DraftCategory;
};

export const categoryReducer = (state: DraftCategory, action: CategoryAction): DraftCategory => {
  switch (action.type) {
    case 'new':
      return initialCategory;
    case 'edit':
      if (action.category) {
        return action.category;
      }
      return state;
    case 'reset':
      return initialCategory;
    default:
      return state;
  }
};
