import React, {ChangeEvent, useId} from "react";
import Label from "./Label"
import TextInput from "./TextInput"

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
      <Label htmlFor={id ?? uniqueId} text={label}/>
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

export default LabeledTextInput;