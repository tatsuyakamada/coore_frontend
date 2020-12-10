import { Genre, isGenre } from '../../interfaces/domains/dish';
import { MenuCategory, isMenuCategory } from '../../interfaces/domains/menu';

export type SearchCondition = {
  show: boolean;
  genres: Genre[];
  categories: MenuCategory[];
  words: string | null;
};

export type SearchAction = {
  type: 'open' | 'close' | 'genre' | 'category' |'words' | 'reset';
  value?: string | null,
};

export const initialCondition: SearchCondition = {
  show: false,
  genres: ['japanese', 'western', 'chinese', 'other'],
  categories: ['main', 'side', 'dessert', 'other'],
  words: null,
};

export const dishSearchReducer = (
  state: SearchCondition,
  action: SearchAction,
): SearchCondition => {
  switch (action.type) {
    case 'open':
      return { ...state, show: true };
    case 'close':
      return { ...state, show: false };
    case 'genre':
      if (action.value && isGenre(action.value)) {
        const newGenres = state.genres.includes(action.value)
          ? state.genres.filter((genre) => (genre !== action.value))
          : [...state.genres, action.value];
        return { ...state, genres: newGenres };
      }
      return state;
    case 'category':
      if (action.value && isMenuCategory(action.value)) {
        const newCategories = state.categories.includes(action.value)
          ? state.categories.filter((category) => (category !== action.value))
          : [...state.categories, action.value];
        return { ...state, categories: newCategories };
      }
      return state;
    case 'words':
      if (action.value !== undefined) return { ...state, words: action.value };
      return state;
    case 'reset':
      return { ...initialCondition, show: true };
    default:
      return state;
  }
};
