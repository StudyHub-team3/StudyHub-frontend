import React from "react";

interface TagProps {
  label: string;
}

const CategoryTag = ({ label }: TagProps) => {
  return (
    <span className="text-tag font-extrabold px-2 py-1 rounded-full">
      {label}
    </span>
  );
};

export default CategoryTag;