import { DraftSubCategory } from '../../interfaces/domains/stuff';

export type SubCategoryModal = {
  show: boolean;
};

export type SubCategoryModalAction = {
  type: 'open' | 'close';
};

export const subCategoryModalReducer = (
  state: SubCategoryModal,
  action: SubCategoryModalAction,
): SubCategoryModal => {
  switch (action.type) {
    case 'open':
      return { show: true };
    case 'close':
      return { show: false };
    default:
      return state;
  }
};

export const initialSubCategory: DraftSubCategory = {
  id: null,
  name: '',
  category: null,
};

export type SubCategoryAction = {
  type: 'new' | 'edit' | 'reset';
  subCategory?: DraftSubCategory;
};

export const subCategoryReducer = (
  state: DraftSubCategory,
  action: SubCategoryAction,
): DraftSubCategory => {
  switch (action.type) {
    case 'new':
      return initialSubCategory;
    case 'edit':
      if (action.subCategory) {
        return action.subCategory;
      }
      return state;
    case 'reset':
      return initialSubCategory;
    default:
      return state;
  }
};
