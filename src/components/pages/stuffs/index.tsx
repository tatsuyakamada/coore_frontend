import axios from 'axios';
import React, {
  createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import styled from 'styled-components';

import {
  DraftCategory, DraftStuff, DraftSubCategory, StuffRelations,
} from '../../../interfaces/domains/stuff';
import {
  CategoryAction, categoryReducer, initialCategory,
} from '../../../reducers/stuff/categoryForm';
import { StuffRelationModal, stuffModalReducer } from '../../../reducers/stuff/form';
import {
  StuffAction, initialStuff, stuffReducer,
} from '../../../reducers/stuff/stuffForm';
import {
  SubCategoryAction, initialSubCategory, subCategoryReducer,
} from '../../../reducers/stuff/subCategoryForm';
import Url from '../../../utils/api';
import AddButton from '../../atoms/AddButton';
import ContentHeader from '../../organisms/ContentHeader';
import CategoryForm from '../../organisms/stuffs/CategoryForm';
import StuffForm from '../../organisms/stuffs/StuffForm';
import StuffList from '../../organisms/stuffs/StuffList';
import SubCategoryForm from '../../organisms/stuffs/SubCategoryForm';
import { InfoContext } from '../Layout';

export const StuffContext = createContext({} as {
  targetCategory: DraftCategory;
  categoryDispatch: React.Dispatch<CategoryAction>;
  targetSubCategory: DraftSubCategory;
  subCategoryDispatch: React.Dispatch<SubCategoryAction>;
  targetStuff: DraftStuff;
  stuffDispatch: React.Dispatch<StuffAction>;
  stuffRelationModal: StuffRelationModal;
  stuffRelationModalDispatch: React.Dispatch<StuffRelationModal>;
});

const IndexStuff: React.FC = () => {
  const { infoDispatch } = useContext(InfoContext);

  const [targetCategory, categoryDispatch] = useReducer(categoryReducer, initialCategory);
  const [
    targetSubCategory, subCategoryDispatch,
  ] = useReducer(subCategoryReducer, initialSubCategory);
  const [targetStuff, stuffDispatch] = useReducer(stuffReducer, initialStuff);
  const [
    stuffRelationModal, stuffRelationModalDispatch,
  ] = useReducer(stuffModalReducer, { type: null });

  const [categories, setCategories] = useState<StuffRelations[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios.get(Url('categories.json'))
      .then((results) => {
        setCategories(results.data);
        setReload(false);
      })
      .catch((error) => {
        infoDispatch({ type: 'set', value: error.response.data });
      });
  }, [reload]);

  const handleNew = (): void => {
    stuffDispatch({ type: 'new' });
    stuffRelationModalDispatch({ type: 'stuff' });
  };

  const handleCreate = () => (
    setReload(true)
  );

  return (
    <StuffContext.Provider
      value={{
        targetCategory,
        categoryDispatch,
        targetSubCategory,
        subCategoryDispatch,
        targetStuff,
        stuffDispatch,
        stuffRelationModal,
        stuffRelationModalDispatch,
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

const RightContent = styled.div`
  display: flex;
  margin: auto;
  text-align: right;
  width: 100%;
  justify-content: flex-end;
`;

export default IndexStuff;
