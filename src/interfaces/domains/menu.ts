export interface Menu {
  id: number;
  dishName: string;
  category: MenuCategory;
  memo: string;
  image: string;
}

export interface DraftMenu {
  id: number | null;
  index: number;
  dishId: number | null;
  dishName: string;
  category: MenuCategory;
  memo: string;
  image: File | null;
  delete: boolean;
}

export type MenuCategory = 'main' | 'side' | 'dessert' | 'other'
