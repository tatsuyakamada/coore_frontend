import { ScheduleCategoryColor } from '../utils/colors';

const ScheduleCategoryOption = [
  { value: 'dinner', label: 'dinner' },
  { value: 'lunch', label: 'lunch' },
  { value: 'morning', label: 'morning' },
  { value: 'brunch', label: 'brunch' },
];

export const ScheduleCategoryOptionWithColor = [
  { ...ScheduleCategoryOption[0], color: ScheduleCategoryColor.dinner },
  { ...ScheduleCategoryOption[1], color: ScheduleCategoryColor.lunch },
  { ...ScheduleCategoryOption[2], color: ScheduleCategoryColor.morning },
  { ...ScheduleCategoryOption[3], color: ScheduleCategoryColor.brunch },
];

export const ScheduleCategories = {
  dinner: 'ディナー',
  lunch: 'ランチ',
  morning: 'モーニング',
  brunch: 'ブランチ',
} as const;

export default ScheduleCategoryOption;
