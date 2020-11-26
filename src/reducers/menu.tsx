import { DraftMenu } from '../interfaces/domains/menu';

export const initialMenu: DraftMenu = {
  id: null,
  index: 0,
  dishId: null,
  dishName: '',
  category: 'main',
  memo: '',
  image: null,
  delete: false,
};

export type MenusAction = {
  type: 'add' | 'update' | 'delete' | 'reset';
  index: number | null;
  value: DraftMenu | null;
};

export const menusReducer = (state: DraftMenu[], action: MenusAction): DraftMenu[] => {
  const newState = state;
  switch (action.type) {
    case 'add':
      if (action.value !== null) {
        const newMenu = action.value;
        newMenu.index = state.length;
        newState.push(newMenu);
      }
      return newState;
    case 'update':
      if (action.index !== null && action.index > -1 && action.value) {
        newState[action.index] = action.value;
      }
      return newState;
    case 'delete':
      if (action.index !== null) {
        newState[action.index].delete = true;
      }
      return newState;
    case 'reset':
      return [];
    default:
      return state;
  }
};
