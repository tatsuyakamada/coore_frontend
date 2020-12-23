export interface StuffElement {
  id: number;
  name: string;
}

export interface StuffRelations extends StuffElement {
  type: StuffType;
  childs?: StuffRelations[];
}

export interface DraftCategory {
  id: number | null;
  name: string;
}

export interface DraftSubCategory extends DraftCategory {
  category: StuffElement | null;
}

export interface DraftStuff extends DraftSubCategory {
  subCategory: StuffElement | null;
}

export type StuffType = 'category' | 'subCategory' | 'stuff';
