import {ParentChildSelectItem} from "@/types/parent-child-select";

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