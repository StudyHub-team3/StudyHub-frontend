import React from "react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      style={{outline:"none"}}
      className="h-[81px] px-[35px] rounded-[40px] bg-[#FFE095] transition-all text-button-primary"
    >
      {children}
    </button>
  );
};

export default Button;