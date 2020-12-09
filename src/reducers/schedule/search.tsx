import { DayRange } from 'react-modern-calendar-datepicker';

import { ScheduleCategory } from '../../interfaces/domains/schedule';

export type SearchCondition = {
  show: boolean;
  categories: ScheduleCategory[];
  dayRange: DayRange;
};

export type SearchAction = {
  type: 'open' | 'close' | 'category' | 'dayRange' | 'reset';
  category?: ScheduleCategory;
  dayRange?: DayRange;
}

export const initialCondition: SearchCondition = {
  show: false,
  categories: ['dinner', 'lunch', 'morning', 'brunch'],
  dayRange: { from: null, to: null },
};

export const scheduleSearchReducer = (
  state: SearchCondition,
  action: SearchAction,
): SearchCondition => {
  switch (action.type) {
    case 'open':
      return { ...state, show: true };
    case 'close':
      return { ...state, show: false };
    case 'category':
      if (action.category) {
        const newCategories = state.categories.includes(action.category)
          ? state.categories.filter((category) => (category !== action.category))
          : [...state.categories, action.category];
        return { ...state, categories: newCategories };
      }
      return state;
    case 'dayRange':
      if (action.dayRange) return { ...state, dayRange: action.dayRange };
      return state;
    case 'reset':
      return { ...initialCondition, show: true };
    default:
      return state;
  }
};
