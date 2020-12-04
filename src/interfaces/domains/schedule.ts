import { ScheduleCategories } from '../../enum/schedule_category';

import { Image } from './image';
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

export interface DraftImage extends Omit<Image, 'width' | 'height'> {
  delete: boolean;
}

export interface DraftSchedule {
  id: number | null;
  date: Date;
  category: ScheduleCategory;
  memo: string;
  images: FileList | null;
  deleteImages: DraftImage[];
}

export type ScheduleCategory = 'dinner' | 'lunch' | 'morning' | 'brunch'

export const isScheduleCategory = (value: string): value is ScheduleCategory => (
  ScheduleCategories.some((category) => (category === value))
);
