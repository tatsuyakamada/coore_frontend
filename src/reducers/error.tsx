export type Error = {
  status: number;
  message: string;
}

export type ErrorAction = {
  type: 'set' | 'reset';
  value?: Error;
}

export const errorReducer = (state: Error[], action: ErrorAction): Error[] => {
  switch (action.type) {
    case 'set': {
      const errors = state.map((error) => (error.message));
      if (action.value && !errors.includes(action.value.message)) return [...state, action.value];
      return state;
    }
    case 'reset':
      return [];
    default:
      return [];
  }
};
