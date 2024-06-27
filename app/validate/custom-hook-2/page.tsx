'use client'

import {Box, Button, Typography} from "@mui/material";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import './style.css'
import {ValidateRule, InputType} from "@/types/validate-custom-hook";

const defaultRule: ValidateRule = {
    required: true,
    maxLength: 30,
}

const kanaRule: ValidateRule = {
    required: false,
    maxLength: 50,
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

const useTextInput = (rule: ValidateRule = defaultRule): [{ value: string, errors: string[]}, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState<string>('')
    const errors = useValidate(value, 'text', rule)

    return [{ value, errors }, setValue]
}

const useAlphaInput = (rule: ValidateRule = defaultRule): [{ value: string, errors: string[]}, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState<string>('')
    const errors = useValidate(value, 'alpha', rule)

    return [{ value, errors }, setValue]
}

export default function ValidateCustomHook2() {
    const [fullName, setFullName] = useTextInput()
    const [fullNameKana, setFullNameKana] = useTextInput(kanaRule)
    const [fullNameEnglish, setFullNameEnglish] = useAlphaInput({ required: true, maxLength: 40 })

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (fullName.errors.length || fullNameKana.errors.length) {
            return
        }

        alert('No validate errors!')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'fullName': {
                setFullName(event.target.value)
                break
            }
            case 'fullNameKana': {
                setFullNameKana(event.target.value)
                break
            }
            case 'fullNameEnglish': {
                setFullNameEnglish(event.target.value)
                break
            }
            default:
        }
    }

    return (
        <main>
            <Box mt={2} ml={2}>
                <form onSubmit={onSubmit}>
                    <Box mb={2}>
                        <Box mb={1}>
                            <span>名前</span>
                        </Box>
                        <Box>
                            <input type="text" name="fullName" className={fullName.errors.length ? 'error' : ''} onChange={handleChange} />
                        </Box>
                        <Box height="1rem" sx={{color: 'red'}}>
                            {
                                fullName.errors.map((error, index) => <span key={`${index}-fullName`}>{error}</span>)
                            }
                        </Box>
                    </Box>
                    <Box mb={2}>
                        <Box mb={1}>
                            <span>かな</span>
                        </Box>
                        <Box>
                            <input type="text" name="fullNameKana" className={fullNameKana.errors.length ? 'error' : ''} onChange={handleChange} />
                        </Box>
                        <Box height="1rem" sx={{color: 'red'}}>
                            {
                                fullNameKana.errors.map((error, index) => <span key={`${index}-fullNameKana`}>{error}</span>)
                            }
                        </Box>
                    </Box>
                    <Box mb={2}>
                        <Box mb={1}>
                            <span>Full Name</span>
                        </Box>
                        <Box>
                            <input type="text" name="fullNameEnglish" className={fullNameEnglish.errors.length ? 'error' : ''} onChange={handleChange} />
                        </Box>
                        <Box height="1rem" sx={{color: 'red'}}>
                            {
                                fullNameEnglish.errors.map((error, index) => <span key={`${index}-fullNameEnglish`}>{error}</span>)
                            }
                        </Box>
                    </Box>
                    <Box>
                        <Button type="submit" variant="contained" disabled={fullName.errors.length > 0 || fullNameKana.errors.length > 0 || fullNameEnglish.errors.length > 0}>SUBMIT</Button>
                    </Box>
                </form>
            </Box>
            <Box mt={2} ml={2}>
                <Box>
                    <Typography variant="body2">
                        {fullNameKana.value !== '' && `${fullNameKana.value}さん、こんにちは。` }
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h4">
                        {fullName.value !== '' && `${fullName.value}さん、こんにちは。` }
                    </Typography>
                </Box>
            </Box>
        </main>
    )
}