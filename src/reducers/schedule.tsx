import { ScheduleCategories } from '../enum/schedule_category';
import { DraftSchedule, ScheduleCategory } from '../interfaces/domains/schedule';

export type ScheduleAction = {
  type: keyof DraftSchedule | 'reset';
  value: DraftSchedule[keyof DraftSchedule] | null;
};

export const initialSchedule: DraftSchedule = {
  date: new Date(),
  category: 'dinner',
  memo: '',
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
      if (isScheduleCategory(action.value)) {
        return { ...state, category: action.value };
      }
      return state;
    case 'memo':
      if (typeof action.value === 'string') {
        return { ...state, memo: action.value };
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

const isScheduleCategory = (
  value: DraftSchedule[keyof DraftSchedule] | null,
): value is ScheduleCategory => {
  if (typeof value !== 'string') {
    return false;
  }
  return ScheduleCategories.some((category) => (category === value));
};
