export interface ScheduledMenu {
  schedule: Schedule;
  menus: Menu[];
}

export interface Schedule {
  id: string;
  date: Date;
  category: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Menu {
  id: number;
  dishName: string;
  category: string;
  image: string,
}
