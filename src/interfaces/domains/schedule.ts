import { Menu } from './menu';

export interface ScheduledMenu {
  schedule: Schedule;
  menus: Menu[];
}

export interface Schedule {
  id: string;
  date: Date;
  category: string;
  memo: string;
  images: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DraftSchedule {
  date: Date;
  category: string;
  memo: string;
  images: FileList | null;
}
