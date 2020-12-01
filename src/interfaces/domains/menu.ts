export interface Menu {
  id: number;
  dishId: number;
  dishName: string;
  category: MenuCategory;
  memo: string;
  image: Image;
}

export interface DraftMenu {
  id: number | null;
  index: number;
  dishId: number | null;
  dishName: string;
  category: MenuCategory;
  memo: string;
  image: File | null;
  deleteImage: DraftImage | null;
  delete: boolean;
}

interface Image {
  id: number;
  name: string;
  url: string;
}

export interface DraftImage extends Image {
  delete: boolean;
}

export type MenuCategory = 'main' | 'side' | 'dessert' | 'other'
