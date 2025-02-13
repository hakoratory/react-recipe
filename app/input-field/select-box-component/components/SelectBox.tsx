import React from "react";

export type Option = {
  id: string;
  name: string;
}

export type SelectBoxProps = {
  id?: string;
  value: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectBox({ id, value, options, onChange }: SelectBoxProps) {
  return (
    <select id={id} value={value} onChange={onChange}>
      <option value="">選択してください</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  );
}

export default SelectBox;