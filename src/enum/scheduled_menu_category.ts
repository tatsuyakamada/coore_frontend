import { MenuCategoryColor } from '../utils/colors';

const MenuCategoryOption = [
  { value: 'main', label: '主菜' },
  { value: 'side', label: '副菜' },
  { value: 'dessert', label: 'デザート' },
  { value: 'other', label: 'その他' },
];

export const MenuCategoryOptionWithColor = [
  { ...MenuCategoryOption[0], color: MenuCategoryColor.main },
  { ...MenuCategoryOption[1], color: MenuCategoryColor.side },
  { ...MenuCategoryOption[2], color: MenuCategoryColor.dessert },
  { ...MenuCategoryOption[3], color: MenuCategoryColor.other },
];

export const MenuCategories = {
  main: '主菜',
  side: '副菜',
  dessert: 'デザート',
  other: 'その他',
} as const;

export default MenuCategoryOption;
