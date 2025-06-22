import React from "react";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{outline:"none"}}
      className="h-[81px] px-[35px] rounded-[40px] bg-[#FFE095] transition-all text-button-primary"
    >
      {children}
    </button>
  );
};

export default Button;