'use client'

import {Box, Button} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import './style.css'
import {ValidateError} from "@/types/validate-scratch";


export default function ValidateScratch() {
    const [errors, setErrors] = useState<ValidateError[]>([]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const errors = validateForm(form)
        if (errors.length) {
            setErrors(errors)
            return
        }

        setErrors([])
        alert('No validate errors!')
    }

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        let newErrors = errors.filter(error => error.key !== event.target.name)
        newErrors = newErrors.concat(validate(event.target.name, event.target.value))
        setErrors(newErrors)
    }

    const validateForm = (form: FormData): ValidateError[] => {
        let errors: ValidateError[] = [];
        errors = errors.concat(validate('fullName', form.get("fullName") as string ?? ''))
        errors = errors.concat(validate('fullNameKana', form.get("fullNameKana") as string ?? ''))
        return errors
    }

    const validate = (propertyName: string, value: string): ValidateError[] => {
        const errors: ValidateError[] = [];
        if (value === '') {
            errors.push({
                key: propertyName,
                message: '名前を入力してください'
            })
        }
        if ((value as string).length > 30) {
            errors.push({
                key: propertyName,
                message: '30字以下で入力してください'
            })
        }
        return errors
    }

    const getErrorByPropertyName = (propertyName: string) => {
        return errors.filter(error => error.key === propertyName)
    }

    const getErrorMessageByPropertyName = (propertyName: string) => {
        return getErrorByPropertyName(propertyName).map((error, index) => <span key={`${index}-${error.key}`}>{error.message}</span>)
    }

    const isError = (propertyName: string) => {
        return getErrorByPropertyName(propertyName).length > 0
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
                            <input type="text" name="fullName" className={isError('fullName') ? 'error' : ''} onBlur={handleBlur} />
                        </Box>
                        <Box height="1rem" sx={{color: 'red'}}>
                            {
                                getErrorMessageByPropertyName('fullName')
                            }
                        </Box>
                    </Box>
                    <Box mb={2}>
                        <Box mb={1}>
                            <span>かな</span>
                        </Box>
                        <Box>
                            <input type="text" name="fullNameKana" className={isError('fullNameKana') ? 'error' : ''} onBlur={handleBlur} />
                        </Box>
                        <Box height="1rem" sx={{color: 'red'}}>
                            {
                                getErrorMessageByPropertyName('fullNameKana')
                            }
                        </Box>
                    </Box>
                    <Box>
                        <Button type="submit" variant="contained">SUBMIT</Button>
                    </Box>
                </form>
                <Box>
                    {errors[0]?.key} {errors[0]?.message}
                </Box>
                <Box>
                    {errors[1]?.key} {errors[1]?.message}
                </Box>
            </Box>
        </main>
)
}