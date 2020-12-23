import { GenreColor } from '../utils/colors';

const GenreOption = [
  { value: 'japanese', label: '和食' },
  { value: 'western', label: '洋食' },
  { value: 'chinese', label: '中華' },
  { value: 'other', label: 'その他' },
];

export const GenreOptionWithColor = [
  { ...GenreOption[0], color: GenreColor.japanese },
  { ...GenreOption[1], color: GenreColor.western },
  { ...GenreOption[2], color: GenreColor.chinese },
  { ...GenreOption[3], color: GenreColor.other },
];

export const Genres = {
  japanese: '和食',
  western: '洋食',
  chinese: '中華',
  other: 'その他',
} as const;

export default GenreOption;
