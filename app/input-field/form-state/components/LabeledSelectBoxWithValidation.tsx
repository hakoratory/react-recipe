import React, {ChangeEvent} from "react";
import ErrorMessage from "@/app/input-field/form-state/components/ErrorMessage";
import {Option} from "@/app/input-field/form-state/components/SelectBox";
import LabeledSelectBox from "@/app/input-field/form-state/components/LabeledSelectBox";
import {useValidationContext} from "@/app/input-field/form-state/contexts/ValidationContext";

function LabeledSelectBoxWithValidation(
  {
    id,
    label,
    value,
    options,
    onChange,
    required
  }: {
    id?: string;
    label: string;
    value: string;
    options: Option[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    required?: true;
  }
) {
  const { setError, clearError, getError } = useValidationContext();

  const validate = (value: string): string => {
    if (required && value.trim() === '') {
      return `必須項目です。`;
    }
    return '';
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(event);
    const errorMessage = validate(newValue);
    if (errorMessage) {
      setError(label, errorMessage);
    } else {
      clearError(label);
    }
  };

  return (
    <>
      <LabeledSelectBox
        id={id}
        label={label}
        value={value}
        options={options}
        onChange={handleChange}
      />
      <div style={{color: 'red', fontSize: '1rem', minHeight: '1.5rem', marginTop: '0.5rem'}}>
        <ErrorMessage text={getError(label)?.message ?? ''} />
      </div>
    </>
  )
}

export default LabeledSelectBoxWithValidation;
