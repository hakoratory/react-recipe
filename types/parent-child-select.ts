export type FetchItemsRequestType = {
    parentId: number | null
}

export type ParentChildSelectItem = {
    id: number,
    parentId: number | null,
    value: string
}
