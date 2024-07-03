import {ChangeEventHandler} from "react";

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