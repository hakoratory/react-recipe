import React from 'react';
import Button, {ButtonProps} from "@/app/input-field/form-state/components/Button";
import {useValidationContext} from "@/app/input-field/form-state/contexts/ValidationContext";

type ValidationFormButtonProps = Omit<ButtonProps, 'disabled'>

function ValidationFormButton({ text, type, onClick }: ValidationFormButtonProps) {
  const {errors} = useValidationContext()
  return <Button text={text} type={type} onClick={onClick} disabled={errors.length > 0}/>
}

export default ValidationFormButton;