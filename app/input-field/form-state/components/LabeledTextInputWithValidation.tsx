import React, {ChangeEvent, useState} from "react";
import LabeledTextInput from "@/app/input-field/select-box-component/components/LabeledTextInput";
import ErrorMessage from "@/app/input-field/select-box-component/components/ErrorMessage";

interface PatternValidation {
  regex: RegExp;
  message: string;
}

function LabeledTextInputWithValidation(
  {
    id,
    label,
    value,
    onChange,
    placeholder,
    required,
    max,
    min,
    pattern
  }: {
    id?: string;
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: true;
    max?: number;
    min?: number;
    pattern?: PatternValidation[];
  }
) {
  const [error, setError] = useState<string>('');

  const validate = (value: string): string => {
    if (required && value.trim() === '') {
      return `必須項目です。`;
    }
    if (max !== undefined && value.length > max) {
      return `${max}文字以内で入力してください。`;
    }
    if (min !== undefined && value.length < min) {
      return `${min}文字以上で入力してください。`;
    }
    if (pattern) {
      for (const { regex, message } of pattern) {
        if (!regex.test(value)) {
          return message;
        }
      }
    }
    return '';
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(event);
    const errorMessage = validate(newValue);
    setError(errorMessage);
  };

  return (
    <>
      <LabeledTextInput
        id={id}
        label={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div style={{color: 'red', fontSize: '1rem', minHeight: '1.5rem', marginTop: '0.5rem'}}>
        <ErrorMessage text={error}/>
      </div>
    </>
  )
}

export default LabeledTextInputWithValidation;