import { DraftMenu } from '../interfaces/domains/menu';

export type MenusAction = {
  type: keyof DraftMenu | 'add' | 'delete' |'reset';
  index: number | null;
  value: DraftMenu[keyof DraftMenu] | null;
};

export const initialMenus: DraftMenu[] = [
  {
    id: null,
    index: 0,
    dishId: 1,
    category: 'main',
    image: null,
    delete: false,
  },
];

export const menusReducer = (state: DraftMenu[], action: MenusAction): DraftMenu[] => {
  const newSelectedMenus = state;
  if (action.index !== null) {
    switch (action.type) {
      case 'dishId':
        if (typeof action.value === 'number') {
          newSelectedMenus[action.index].dishId = action.value;
        }
        return newSelectedMenus;
      case 'category':
        if (typeof action.value === 'string') {
          newSelectedMenus[action.index].category = action.value;
        }
        return newSelectedMenus;
      case 'image':
        if (action.value instanceof File) {
          newSelectedMenus[action.index].image = action.value;
        }
        return newSelectedMenus;
      case 'delete':
        newSelectedMenus[action.index].delete = true;

        return newSelectedMenus;
      default:
        return state;
    }
  } else {
    switch (action.type) {
      case 'add':
        return newSelectedMenus.concat({
          id: null,
          index: state.length,
          dishId: 1,
          category: 'main',
          image: null,
          delete: false,
        });
      case 'reset':
        return initialMenus;
      default:
        return state;
    }
  }
};
