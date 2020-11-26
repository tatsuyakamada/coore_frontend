import { Menu } from './menu';

export interface ScheduledMenu {
  schedule: Schedule;
  menus: Menu[];
}

export interface Schedule {
  id: string;
  date: Date;
  category: ScheduleCategory;
  memo: string;
  images: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DraftSchedule {
  date: Date;
  category: ScheduleCategory;
  memo: string;
  images: FileList | null;
}

export type ScheduleCategory = 'dinner' | 'lunch' | 'morning' | 'brunch'
