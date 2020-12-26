export type Info = {
  type: 'info' | 'error';
  status: number;
  message: string;
}

export type InfoAction = {
  type: 'set' | 'reset';
  value?: Info;
}

export const infoReducer = (state: Info[], action: InfoAction): Info[] => {
  switch (action.type) {
    case 'set': {
      const infos = state.map((info) => (info.message));
      if (action.value && !infos.includes(action.value.message)) return [...state, action.value];
      return state;
    }
    case 'reset':
      return [];
    default:
      return [];
  }
};
