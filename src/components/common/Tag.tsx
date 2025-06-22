import React from "react";

interface TagProps {
  label: string;
}

const Tag = ({ label }: TagProps) => {
  return (
    <span className="bg-hover-primary text-text-main text-[20px] px-2 py-1 rounded-full">
      {label}
    </span>
  );
};

export default Tag;