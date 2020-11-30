import { Menu } from './menu';

export interface ScheduledMenu {
  schedule: Schedule;
  menus: Menu[];
}

export interface Schedule {
  id: number;
  date: Date;
  category: ScheduleCategory;
  memo: string;
  images: Image[] | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Image {
  id: number;
  name: string;
  url: string;
}

export interface DraftSchedule {
  id: number | null;
  date: Date;
  category: ScheduleCategory;
  memo: string;
  images: FileList | null;
  deleteImages: number[];
}

export type ScheduleCategory = 'dinner' | 'lunch' | 'morning' | 'brunch'
