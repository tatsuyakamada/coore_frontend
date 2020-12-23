import { DraftStuff } from '../../interfaces/domains/stuff';

export type StuffModal = {
  show: boolean;
};

export type StuffModalAction = {
  type: 'open' | 'close';
};

export const stuffModalReducer = (state: StuffModal, action: StuffModalAction): StuffModal => {
  switch (action.type) {
    case 'open':
      return { show: true };
    case 'close':
      return { show: false };
    default:
      return state;
  }
};

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
