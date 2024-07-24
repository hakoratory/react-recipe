import {ChangeEvent, ChangeEventHandler} from "react";

export type InputProps = {
  label: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  errors: string[]
}

export type TableUser = {
  id: number,
  name: string,
  department: string,
  favoriteThings: string,
}

export type FetchTableUsersRequestType = {
  name: string | null
}

export type FetchTableUsersWithPageRequestType = {
  name: string | null,
  page: number,
  pageSize: number
}

export type FetchTableUsersWithPageResponseType = {
  users: TableUser[],
  totalCount: number
}

export type PagerProps = {
  totalCount: number,
  page: number,
  pageSize: number,
  onPageChange: (page: number) => {},
}

export type RichPagerProps = {
  totalCount: number,
  page: number,
  pageSize: number,
  onPageChange: (event: ChangeEvent<unknown>, page: number) => {},
}