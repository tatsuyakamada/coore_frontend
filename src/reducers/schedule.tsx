import { DraftSchedule } from '../interfaces/domains/schedule';

export type ScheduleAction = {
  type: keyof DraftSchedule | 'reset';
  value: DraftSchedule[keyof DraftSchedule] | null;
};

export const initialSchedule: DraftSchedule = {
  date: new Date(),
  category: 'dinner',
  images: null,
};

export const scheduleReducer = (state: DraftSchedule, action: ScheduleAction): DraftSchedule => {
  switch (action.type) {
    case 'date':
      if (action.value instanceof Date) {
        return { ...state, date: action.value };
      }
      return state;
    case 'category':
      if (typeof action.value === 'string') {
        return { ...state, category: action.value };
      }
      return state;
    case 'images':
      if (action.value instanceof FileList) {
        return { ...state, images: action.value };
      }
      return state;
    case 'reset':
      return initialSchedule;
    default:
      return state;
  }
};
