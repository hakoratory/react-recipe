export type FetchItemsRequestType = {
    parentId: number | null
}

export type ParentChildSelectItem = {
    id: number,
    parentId: number | null,
    value: string
}

export type ParentChildSelectItemForm = {
    itemId: number | null,
    subItemId: number | null,
    subSubItemId: number | null,
}