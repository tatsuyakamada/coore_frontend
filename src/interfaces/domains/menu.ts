export interface Menu {
  id: number;
  dishName: string;
  category: string;
  memo: string;
  image: string;
}

export interface DraftMenu {
  id: number | null;
  index: number;
  dishId: number | null;
  dishName: string;
  category: string;
  memo: string;
  image: File | null;
  delete: boolean;
}
