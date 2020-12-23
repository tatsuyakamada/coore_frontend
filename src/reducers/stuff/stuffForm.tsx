import { DraftStuff } from '../../interfaces/domains/stuff';

export const initialStuff: DraftStuff = {
  id: null,
  category: null,
  subCategory: null,
  name: '',
};

export type StuffAction = {
  type: 'new' | 'edit' | 'reset';
  stuff?: DraftStuff;
};

export const stuffReducer = (state: DraftStuff, action: StuffAction): DraftStuff => {
  switch (action.type) {
    case 'new':
      return initialStuff;
    case 'edit':
      if (action.stuff) {
        return action.stuff;
      }
      return state;
    case 'reset':
      return initialStuff;
    default:
      return state;
  }
};
