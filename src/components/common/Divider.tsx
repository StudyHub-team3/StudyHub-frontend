import React from "react";
import clsx from "clsx";

interface DividerProps {
  vertical?: boolean;
  spacing?: string; 
  color?: string;  
}

export const Divider = ({ vertical = false, spacing = "", color = "border-border" }: DividerProps) => {
  const base = vertical
    ? clsx("w-px h-full border-l", spacing, color)
    : clsx("w-full h-px border-t", spacing, color);

  return <div className={base} />;
};

export default Divider;
