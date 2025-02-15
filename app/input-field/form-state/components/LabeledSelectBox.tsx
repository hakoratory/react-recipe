import Label from "@/app/input-field/select-box-component/components/Label";
import React from "react";
import SelectBox, {SelectBoxProps} from "@/app/input-field/form-state/components/SelectBox";

type LabeledSelectBoxProps = SelectBoxProps & {
  label: string;
};

function LabeledSelectBox({ id, label, value, options, onChange }: LabeledSelectBoxProps) {
  return (
    <>
      <Label htmlFor={id} text={label}/>
      <div>
        <SelectBox
          id={id}
          value={value}
          options={options}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default LabeledSelectBox;