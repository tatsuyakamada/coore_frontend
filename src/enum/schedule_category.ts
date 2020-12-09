const ScheduleCategoryOption = [
  { value: 'dinner', label: 'dinner' },
  { value: 'lunch', label: 'lunch' },
  { value: 'morning', label: 'morning' },
  { value: 'brunch', label: 'brunch' },
];

export const ScheduleCategories = {
  dinner: 'ディナー',
  lunch: 'ランチ',
  morning: 'モーニング',
  brunch: 'ブランチ',
} as const;

export default ScheduleCategoryOption;
