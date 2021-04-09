const DishStuffOption = [
  { value: 'essential', label: '必須' },
  { value: 'desireble', label: 'あるといい' },
  { value: 'optional', label: 'なくてもいい' },
];

export const DishStuffCategories = {
  essential: '必須',
  desireble: 'あるといい',
  optional: 'なくてもいい',
} as const;

export default DishStuffOption;
