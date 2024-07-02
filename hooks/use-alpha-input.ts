import {ValidateRule} from "@/types/validate-custom-hook";
import {Dispatch, SetStateAction, useState} from "react";
import {defaultRule, useValidate} from "@/hooks/use-validate";

export const useAlphaInput = (rule: ValidateRule = defaultRule): [{ value: string, errors: string[]}, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState<string>('')
    const errors = useValidate(value, 'alpha', rule)

    return [{ value, errors }, setValue]
}