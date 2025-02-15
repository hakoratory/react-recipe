'use client'

import React, {useState, ChangeEvent, FormEvent, createContext, ReactNode, useContext} from "react";
import './style.css'
import LabeledTextInputWithValidation from "@/app/input-field/select-box-component/components/LabeledTextInputWithValidation";
import {prefectures} from "@/data/prefectures";
import LabeledSelectBoxWithValidation from "@/app/input-field/form-state/components/LabeledSelectBoxWithValidation";
import {ValidationContextProvider} from "@/app/input-field/form-state/contexts/ValidationContext";

function SelectBoxComponent() {
  const [name, setName] = useState<string>('');
  const [nameKana, setNameKana] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [prefecture, setPrefecture] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log({name, nameKana});
  };

  return (
    <main>
      <div style={{marginTop: '2rem', marginLeft: '2rem'}}>
        <ValidationContextProvider>
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
            <div>
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
              <LabeledTextInputWithValidation
                label={'郵便番号'}
                value={postalCode}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPostalCode(event.target.value)}
                placeholder={'郵便番号を入力してください'}
                required
                max={7}
                min={7}
                pattern={[
                  {regex: /^[0-9]+$/, message: '数字のみ使用できます'}
                ]}
              />
            </div>
            <div>
              <LabeledSelectBoxWithValidation
                value={prefecture}
                options={prefectures}
                onChange={e => setPrefecture(e.target.value)}
                label={'都道府県'}
                required
              />
            </div>
            <div>
              <LabeledTextInputWithValidation
                label={'市区町村以降の住所'}
                value={address}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)}
                placeholder={'市区町村以降の住所を入力してください'}
                required
                max={50}
              />
            </div>
            <div>
              <LabeledTextInputWithValidation
                label={'電話番号'}
                value={phoneNumber}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value)}
                placeholder={'電話番号を入力してください'}
                required
                max={11}
                min={10}
                pattern={[
                  {regex: /^[0-9]+$/, message: '数字のみ使用できます'}
                ]}
              />
            </div>
            <div style={{marginTop: '0.5rem'}}>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </ValidationContextProvider>
      </div>
    </main>
  );
}

export default SelectBoxComponent;
