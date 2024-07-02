import {ChangeEventHandler} from "react";

export type InputProps = {
    label: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    errors: string[]
}