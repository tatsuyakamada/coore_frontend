const GenreOption = [
  { value: 'japanese', label: '和食' },
  { value: 'western', label: '洋食' },
  { value: 'chinese', label: '中華' },
  { value: 'other', label: 'その他' },
];

export const Genres = {
  japanese: '和食',
  western: '洋食',
  chinese: '中華',
  other: 'その他',
} as const;

export default GenreOption;
