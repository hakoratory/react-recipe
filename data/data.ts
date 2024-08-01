import {ParentChildSelectItem} from "@/types/parent-child-select";
import {TableUser} from "@/types/table";

export const parentChildSelectItems: Array<ParentChildSelectItem> = [
  {
    id: 1,
    parentId: null,
    value: 'item-1'
  },
  {
    id: 2,
    parentId: null,
    value: 'item-2'
  },
  // 中項目
  {
    id: 3,
    parentId: 1,
    value: 'item-1-1'
  },
  {
    id: 4,
    parentId: 1,
    value: 'item-1-2'
  },
  {
    id: 5,
    parentId: 2,
    value: 'item-2-1'
  },
  {
    id: 6,
    parentId: 2,
    value: 'item-2-2'
  },
  // 小項目
  {
    id: 7,
    parentId: 3,
    value: 'item-1-1-1'
  },
  {
    id: 8,
    parentId: 3,
    value: 'item-1-1-2'
  },
  {
    id: 9,
    parentId: 4,
    value: 'item-1-2-1'
  },
  {
    id: 10,
    parentId: 4,
    value: 'item-1-2-2'
  },
  {
    id: 11,
    parentId: 5,
    value: 'item-2-1-1'
  },
  {
    id: 12,
    parentId: 5,
    value: 'item-2-1-2'
  },
  {
    id: 13,
    parentId: 6,
    value: 'item-2-2-1'
  },
  {
    id: 14,
    parentId: 6,
    value: 'item-2-2-2'
  },
]

export const tableUsers: TableUser[] = [
  {
    id: 1,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 2,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 3,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 4,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
  {
    id: 5,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 6,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 7,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 8,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 9,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
  {
    id: 10,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 11,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 12,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 13,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 14,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
  {
    id: 15,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 16,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 17,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 18,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 19,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 20,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
  {
    id: 21,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 22,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 23,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 24,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
  {
    id: 25,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 26,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 27,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 28,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 29,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 30,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
  {
    id: 31,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 32,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 33,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 34,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
  {
    id: 35,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 36,
    name: '佐々木　浩介',
    department: 'システム開発部',
    favoriteThings: '読書'
  },
  {
    id: 37,
    name: '佐藤　健太',
    department: '営業部',
    favoriteThings: 'とんかつ'
  },
  {
    id: 38,
    name: '鈴木　二郎',
    department: 'システム開発部',
    favoriteThings: 'ラーメン'
  },
  {
    id: 39,
    name: '田中　吉郎',
    department: 'データ分析部',
    favoriteThings: 'トランプ'
  },
  {
    id: 40,
    name: '斉藤　涼介',
    department: '総務部',
    favoriteThings: '映画鑑賞'
  },
]