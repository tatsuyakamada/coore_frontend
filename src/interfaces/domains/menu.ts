export interface Menu {
  id: number;
  dishName: string;
  category: string;
  image: string,
}

export interface DraftMenu {
  id: number | null,
  index: number,
  dishId: number | null,
  category: string,
  image: File | string | null,
  delete: boolean,
}
