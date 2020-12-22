import axios from 'axios';
import React, {
  createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import styled from 'styled-components';

import {
  DraftCategory, DraftStuff, DraftSubCategory, StuffRelations,
} from '../../../interfaces/domains/stuff';
import {
  CategoryAction, CategoryModal, CategoryModalAction,
  categoryModalReducer, categoryReducer, initialCategory,
} from '../../../reducers/stuff/categoryForm';
import {
  StuffAction, StuffModal, StuffModalAction,
  initialStuff, stuffModalReducer, stuffReducer,
} from '../../../reducers/stuff/stuffForm';
import {
  SubCategoryAction, SubCategoryModal, SubCategoryModalAction,
  initialSubCategory, subCategoryModalReducer, subCategoryReducer,
} from '../../../reducers/stuff/subCategoryForm';
import AddButton from '../../atoms/AddButton';
import ContentHeader from '../../organisms/ContentHeader';
import CategoryForm from '../../organisms/stuffs/CategoryForm';
import StuffForm from '../../organisms/stuffs/StuffForm';
import StuffList from '../../organisms/stuffs/StuffList';
import SubCategoryForm from '../../organisms/stuffs/SubCategoryForm';
import { ErrorContext } from '../Layout';

export const StuffContext = createContext({} as {
  targetCategory: DraftCategory;
  categoryDispatch: React.Dispatch<CategoryAction>;
  categoryModal: CategoryModal;
  categoryModalDispatch: React.Dispatch<CategoryModalAction>;
  targetSubCategory: DraftSubCategory;
  subCategoryDispatch: React.Dispatch<SubCategoryAction>;
  subCategoryModal: SubCategoryModal;
  subCategoryModalDispatch: React.Dispatch<SubCategoryModalAction>;
  targetStuff: DraftStuff;
  stuffDispatch: React.Dispatch<StuffAction>;
  stuffModal: StuffModal;
  stuffModalDispatch: React.Dispatch<StuffModalAction>;
});

const IndexStuff: React.FC = () => {
  const { errorDispatch } = useContext(ErrorContext);

  const [targetCategory, categoryDispatch] = useReducer(categoryReducer, initialCategory);
  const [categoryModal, categoryModalDispatch] = useReducer(categoryModalReducer, { show: false });
  const [
    targetSubCategory, subCategoryDispatch,
  ] = useReducer(subCategoryReducer, initialSubCategory);
  const [
    subCategoryModal, subCategoryModalDispatch,
  ] = useReducer(subCategoryModalReducer, { show: false });
  const [targetStuff, stuffDispatch] = useReducer(stuffReducer, initialStuff);
  const [stuffModal, stuffModalDispatch] = useReducer(stuffModalReducer, { show: false });

  const [categories, setCategories] = useState<StuffRelations[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:3100/api/v1/categories.json')
      .then((results) => {
        setCategories(results.data);
        setReload(false);
      })
      .catch((error) => {
        errorDispatch({ type: 'set', value: error.response.data });
      });
  }, [reload]);

  const handleNew = (): void => {
    stuffDispatch({ type: 'new' });
    stuffModalDispatch({ type: 'open' });
  };

  const handleCreate = () => (
    setReload(true)
  );

  return (
    <StuffContext.Provider
      value={{
        targetCategory,
        categoryDispatch,
        categoryModal,
        categoryModalDispatch,
        targetSubCategory,
        subCategoryDispatch,
        subCategoryModal,
        subCategoryModalDispatch,
        targetStuff,
        stuffDispatch,
        stuffModal,
        stuffModalDispatch,
      }}
    >
      <ContentHeader title="Stuff">
        <RightContent>
          <AddButton onClick={handleNew} />
        </RightContent>
      </ContentHeader>
      <CategoryForm onCreate={handleCreate} />
      <SubCategoryForm categories={categories} onCreate={handleCreate} />
      <StuffForm categories={categories} onCreate={handleCreate} />
      <StuffList categories={categories} />
    </StuffContext.Provider>
  );
};

const RightContent = styled.div({
  display: 'flex',
  margin: 'auto',
  textAlign: 'right',
  width: '100%',
  justifyContent: 'flex-end',
});

export default IndexStuff;
