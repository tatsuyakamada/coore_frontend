import { ScheduledMenu } from '../../interfaces/domains/schedule';

export type ScheduledMenusAction = {
  type: 'fetch';
  value: ScheduledMenu[] | null;
};

export const scheduledmenusReducer = (
  state: ScheduledMenu[], action: ScheduledMenusAction,
): ScheduledMenu[] => {
  switch (action.type) {
    case 'fetch':
      if (action.value) {
        return action.value;
      }
      return state;
    default:
      return state;
  }
};
