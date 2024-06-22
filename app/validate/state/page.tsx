'use client'

import {Box, Button} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import './style.css'
import {ValidateError} from "@/types/validate-scratch";


export default function ValidateState() {
    const [fullName, setFullName] = useState<string>('')
    const [fullNameKana, setFullNameKana] = useState<string>('')
    const [errors, setErrors] = useState<ValidateError[]>([])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const errors = validateForm()
        setErrors(errors)
        if (errors.length) {
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
            default:
        }

        const errorsWithoutTarget = errors.filter(error => error.key !== event.target.name)
        const newErrors = errorsWithoutTarget.concat(validate(event.target.name, event.target.value))
        setErrors(newErrors)
    }

    const validateForm = (): ValidateError[] => {
        return [
            ...validate('fullName', fullName),
            ...validate('fullNameKana', fullNameKana)
        ]
    }

    const validate = (propertyName: string, value: string): ValidateError[] => {
        const errors: ValidateError[] = [];
        if (value === '') {
            errors.push({
                key: propertyName,
                message: '入力してください'
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
                            <input type="text" name="fullName" className={isError('fullName') ? 'error' : ''} onChange={handleChange} />
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
                            <input type="text" name="fullNameKana" className={isError('fullNameKana') ? 'error' : ''} onChange={handleChange} />
                        </Box>
                        <Box height="1rem" sx={{color: 'red'}}>
                            {
                                getErrorMessageByPropertyName('fullNameKana')
                            }
                        </Box>
                    </Box>
                    <Box>
                        <Button type="submit" variant="contained" disabled={errors.length > 0}>SUBMIT</Button>
                    </Box>
                </form>
            </Box>
        </main>
)
}