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
    }
]