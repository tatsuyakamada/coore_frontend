const MenuCategoryOption = [
  { value: 'main', label: '主菜' },
  { value: 'side', label: '副菜' },
  { value: 'dessert', label: 'デザート' },
  { value: 'other', label: 'その他' },
];

export const MenuCategories = {
  main: '主菜',
  side: '副菜',
  dessert: 'デザート',
  other: 'その他',
} as const;

export default MenuCategoryOption;
