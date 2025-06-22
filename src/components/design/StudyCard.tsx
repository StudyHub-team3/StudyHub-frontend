import React from "react";
import Tag from "./Tag";

interface StudyCardProps {
  title: string;
  description: string;
  tags: string[];
  mentorCurrent: number;
  mentorTotal: number;
  menteeCurrent: number;
  menteeTotal: number;
  onClick?: () => void;
}

const StudyCard = ({ title, description, tags, mentorCurrent, mentorTotal, menteeCurrent, menteeTotal, onClick }: StudyCardProps) => {
  return (
    <div
      className="w-full max-w-[382px] h-[282px] bg-[#FFF7E0] rounded-[20px] px-[23px] py-[30px] shadow cursor-pointer hover:shadow-md transition font-sans"      onClick={onClick}
    >
      <div className="flex items-center gap-[15px] mb-[10px]">
        <div className="text-groupname">{title}</div>
        {tags.length > 0 && (
          <span className="text-caption">
            {tags[0]}
          </span>
        )}
      </div>
      <div className="flex items-center gap-[5px] text-label mb-[15px]">
        <span>👤</span>
        <span className="ml-2">멘토 {mentorCurrent}/{mentorTotal}</span>
        <span>·</span>
        <span>멘티 {menteeCurrent}/{menteeTotal}</span>
      </div>
      <div className="text-description mt-4 line-clamp-4">
        {description}
      </div>
    </div>
  );
};

export default StudyCard;