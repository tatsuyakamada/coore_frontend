export type StuffRelationModal = {
  type: 'category' | 'sub_category' | 'stuff' | null;
};

export const stuffModalReducer = (
  state: StuffRelationModal, action: StuffRelationModal,
): StuffRelationModal => ({ type: action.type });
