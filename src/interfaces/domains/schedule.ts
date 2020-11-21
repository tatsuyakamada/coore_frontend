export interface ScheduledMenu {
  schedule: Schedule;
  menus: Menu[];
}

export interface Schedule {
  id: string;
  date: Date;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Menu {
  id: number;
  dishName: string;
  category: string;
}
