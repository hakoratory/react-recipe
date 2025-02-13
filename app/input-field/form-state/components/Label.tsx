import React from "react";

function Label({htmlFor, text}: {htmlFor?: string; text: string;}) {
  return <label htmlFor={htmlFor}>{text}</label>
}

export default Label;