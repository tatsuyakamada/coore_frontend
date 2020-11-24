import { Menu } from './menu';

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

export interface DraftSchedule {
  date: Date,
  category: string,
  image: File | string | null,
}
