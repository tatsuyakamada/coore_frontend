export interface Menu {
  id: number;
  dishId: number;
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
  deleteImage: Image | null;
  delete: boolean;
}

interface Image {
  id: number;
  name: string;
  url: string;
}

export type MenuCategory = 'main' | 'side' | 'dessert' | 'other'
