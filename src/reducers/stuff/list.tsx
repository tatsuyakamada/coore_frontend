import { SelectItem } from '../../components/molecules/AutoFillSelector';

export type StuffListAction = {
  type: 'set' | 'select' | 'delete';
  value: SelectItem[] | number | null;
  prev?: number;
};

export const stuffListReducer = (state: SelectItem[], action: StuffListAction): SelectItem[] => {
  const newState = state;
  switch (action.type) {
    case 'set':
      return action.value && typeof action.value !== 'number' ? action.value : [];
    case 'select':
      newState.forEach((stuff, index) => {
        if (action.value && stuff.id === action.value) newState[index].selectable = false;
        if (stuff.id === action.prev) newState[index].selectable = true;
      });
      return newState;
    case 'delete':
      if (action.value !== null) {
        newState.forEach((stuff, index) => {
          if (stuff.id === action.value) {
            newState[index].selectable = true;
          }
        });
      }
      return newState;
    default:
      return state;
  }
};
