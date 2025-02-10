import React, {ChangeEvent} from "react";

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

export default TextInput;