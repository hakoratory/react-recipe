import {InputType, ValidateRule} from "@/types/validate-custom-hook";
import {useEffect, useState} from "react";

const defaultRule: ValidateRule = {
    required: false,
    maxLength: 30,
}

const useValidate = (value: string, type: InputType, rule: ValidateRule) => {
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        const validate = (): string[] => {
            const errors: string[] = [];
            if (rule.required && value === '') {
                errors.push('入力してください')
            }
            if (value.length > rule.maxLength) {
                errors.push(`${rule.maxLength}字以下で入力してください`)
            }
            if (type === 'alpha' && !value.match(/^[a-zA-Z ]*$/)) {
                errors.push('半角英字で入力してください')
            }
            return errors
        }
        setErrors(validate())
        // rule を依存関係に含めていないため警告が出るが、含めたくないので抑止する。
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return errors
}

export {
    defaultRule,
    useValidate,
}