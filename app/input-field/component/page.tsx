'use client'

import React, { useState, useId, ChangeEvent, FormEvent } from "react";
import './style.css'

function Label({htmlFor, text}: {htmlFor?: string; text: string;}) {
  return <label htmlFor={htmlFor}>{text}</label>
}

function TextInput({id, value, onChange, placeholder}: {
  id?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return <input
    id={id}
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
}

function ErrorMessage({text}: {text: string}) {
  return <span style={{color: 'red'}}>{text}</span>
}

function LabeledTextInput({id, label, value, onChange, placeholder}: {
  id?: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  const uniqueId = useId()
  return (
    <>
      <Label htmlFor={id} text={label}/>
      <div>
        <TextInput
          id={id ?? uniqueId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}

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

function InputFormComponent() {
  const [name, setName] = useState<string>('');
  const [nameKana, setNameKana] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log({ name, nameKana });
  };

  return (
    <main>
      <div style={{marginTop: '2rem', marginLeft: '2rem'}}>
        <form onSubmit={handleSubmit}>
          <div>
            <LabeledTextInputWithValidation
              label={'名前'}
              value={name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
              placeholder={'名前を入力してください'}
              required
              max={50}
              min={2}
            />
          </div>
          <div style={{marginTop: '1rem'}}>
            <LabeledTextInputWithValidation
              label={'名前（カナ）'}
              value={nameKana}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNameKana(event.target.value)}
              placeholder={'名前（カナ）を入力してください'}
              required
              max={50}
              min={2}
              pattern={[
                {regex: /^[ァ-ヴ]+$/, message: 'カタカナのみ使用できます'}
              ]}
            />
          </div>
          <div style={{marginTop: '1rem'}}>
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default InputFormComponent;
