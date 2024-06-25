'use client'

import {Box, Button, Typography} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import './style.css'
import {ValidateError} from "@/types/validate-scratch";
import {ValidateUseEffectForm} from "@/types/validate-use-effect";


export default function ValidateUseEffect() {
    const [formData, setFormData] = useState<ValidateUseEffectForm>({
        fullName: '',
        fullNameKana: '',
    })
    const [errors, setErrors] = useState<ValidateError[]>([])

    useEffect(() => {
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

        setErrors([
            ...validate('fullName', formData.fullName),
            ...validate('fullNameKana', formData.fullNameKana)
        ])

    }, [formData]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setErrors(errors)
        if (errors.length) {
            return
        }

        alert('No validate errors!')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'fullName': {
                setFormData({...formData, fullName: event.target.value})
                break
            }
            case 'fullNameKana': {
                setFormData({...formData, fullNameKana: event.target.value})
                break
            }
            default:
        }
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
            <Box mt={2} ml={2}>
                <Box>
                    <Typography variant="body2">
                        {formData.fullNameKana !== '' && `${formData.fullNameKana}さん、こんにちは。` }
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h4">
                        {formData.fullName !== '' && `${formData.fullName}さん、こんにちは。` }
                    </Typography>
                </Box>
            </Box>
        </main>
    )
}