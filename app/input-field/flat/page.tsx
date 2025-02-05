'use client'

import React, { useState, useId, ChangeEvent, FormEvent } from "react";
import './style.css'
import { Box } from "@mui/material";

function InputForm() {
  const [name, setName] = useState<string>('');
  const [nameKana, setNameKana] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [nameKanaError, setNameKanaError] = useState<string>('');
  const nameId = useId();
  const nameKanaId = useId();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setName(newValue);
    validateName(newValue);
  };

  const handleNameKanaChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setNameKana(newValue);
    validateNameKana(newValue);
  };

  const validateName = (value: string): void => {
    if (value.trim() === '') {
      setNameError('必須項目です。');
    } else if (value.length > 50) {
      setNameError('50文字以内で入力してください。');
    } else if (value.length < 2) {
      setNameError('2文字以上で入力してください。');
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      setNameError('英字のみ使用できます。');
    } else {
      setNameError('');
    }
  };

  const validateNameKana = (value: string): void => {
    if (value.trim() === '') {
      setNameKanaError('必須項目です。');
    } else if (value.length > 50) {
      setNameKanaError('50文字以内で入力してください。');
    } else if (value.length < 2) {
      setNameKanaError('2文字以上で入力してください。');
    } else if (!/^[\u30A0-\u30FF\u3000]+$/.test(value)) {
      setNameKanaError('カタカナのみ使用できます。');
    } else {
      setNameKanaError('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log({ name, nameKana });
  };

  return (
    <main>
      <Box mt={2} ml={2}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor={nameId}>名前</label>
            <div>
              <input
                id={nameId}
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="名前を入力してください"
              />
            </div>
            <div style={{color: 'red', fontSize: '1rem', minHeight: '1.5rem', marginTop: '0.5rem'}}>
              <span>{nameError}</span>
            </div>
          </div>
          <div style={{marginTop: '1rem'}}>
            <label htmlFor={nameKanaId}>名前（カナ）</label>
            <div>
              <input
                id={nameKanaId}
                type="text"
                value={nameKana}
                onChange={handleNameKanaChange}
                placeholder="名前（カナ）を入力してください"
              />
            </div>
            <div style={{color: 'red', fontSize: '1rem', minHeight: '1.5rem', marginTop: '0.5rem'}}>
              <span>{nameKanaError}</span>
            </div>
          </div>
          <div style={{marginTop: '1rem'}}>
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </Box>
    </main>
  );
}

export default InputForm;
