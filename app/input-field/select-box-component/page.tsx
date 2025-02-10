'use client'

import React, { useState, ChangeEvent, FormEvent } from "react";
import './style.css'
import LabeledTextInputWithValidation from "@/app/input-field/select-box-component/components/LabeledTextInputWithValidation";
import {prefectures} from "@/data/prefectures";

function SelectBoxComponent() {
  const [name, setName] = useState<string>('');
  const [nameKana, setNameKana] = useState<string>('');
  const [prefecture, setPrefecture] = useState<string>('');

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
            <label htmlFor={'pref'}>都道府県</label>
            <div>
              <select value={prefecture} onChange={e => setPrefecture(e.target.value)}>
                <option value={''}>選択してください</option>
                {
                  prefectures.map((prefecture) => (
                    <option key={prefecture.id} value={prefecture.id}>{prefecture.value}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div style={{marginTop: '1rem'}}>
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SelectBoxComponent;
