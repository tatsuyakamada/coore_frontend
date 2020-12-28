import {
  DraftImage, DraftSchedule, Schedule, isScheduleCategory,
} from '../../interfaces/domains/schedule';

export type ScheduleModal = {
  show: boolean;
};

export type ScheduleModalAction = {
  type: 'open' | 'close';
}

export const scheduleModalReducer = (
  state: ScheduleModal,
  action: ScheduleModalAction,
): ScheduleModal => {
  switch (action.type) {
    case 'open':
      return { show: true };
    case 'close':
      return { show: false };
    default:
      return state;
  }
};

export type ScheduleAction = {
  type: keyof DraftSchedule | 'new' | 'edit' | 'reset';
  schedule?: Schedule | DraftSchedule;
  value?: DraftSchedule[keyof DraftSchedule];
};

export const initialSchedule: DraftSchedule = {
  id: null,
  date: new Date(),
  category: 'dinner',
  memo: '',
  images: null,
  deleteImages: [],
};

export const scheduleReducer = (state: DraftSchedule, action: ScheduleAction): DraftSchedule => {
  switch (action.type) {
    case 'new':
      return { ...initialSchedule };
    case 'edit':
      if (action.schedule && isSchedule(action.schedule)) {
        const {
          id, date, category, memo, images,
        } = action.schedule;
        const deleteImages: DraftImage[] = [];
        if (images) {
          images.forEach((image) => {
            deleteImages.push({
              id: image.id,
              name: image.name,
              url: image.url,
              delete: false,
            });
          });
        }
        return {
          id: id || null,
          date,
          category,
          memo,
          images: null,
          deleteImages: deleteImages || [],
        };
      }
      return state;
    case 'date':
      if (action.value instanceof Date) {
        return { ...state, date: action.value };
      }
      return state;
    case 'category':
      if (action.value && typeof action.value === 'string' && isScheduleCategory(action.value)) {
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
    case 'deleteImages':
      if (typeof action.value === 'number') {
        const newDeleteImages = state.deleteImages;
        newDeleteImages.forEach((image) => {
          if (image.id === action.value) {
            image.delete = true;
          }
        });
        return { ...state, deleteImages: newDeleteImages };
      }
      return state;
    case 'reset':
      return { ...initialSchedule };
    default:
      return state;
  }
};

const isSchedule = (schedule: Schedule | DraftSchedule): schedule is Schedule => (
  !('deleteImage' in schedule)
);
