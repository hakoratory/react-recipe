import React from "react";

function ErrorMessage({text}: {text: string}) {
  return <span style={{color: 'red'}}>{text}</span>
}

export default ErrorMessage;