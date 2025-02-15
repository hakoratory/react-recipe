import React from 'react';

export type ButtonProps = {
  text: string;
  type: 'submit' | 'button';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

function Button({ text, type, onClick, disabled = false }: ButtonProps) {
  return <button type={type} onClick={onClick} disabled={disabled}>{text}</button>
}

export default Button;