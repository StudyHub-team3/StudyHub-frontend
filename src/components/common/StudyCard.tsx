import React from "react";

interface StudyCardProps {
  title: string;
  description: string;
  category: string;
  mentorCurrent: number;
  mentorTotal: number;
  menteeCurrent: number;
  menteeTotal: number;
  onClick?: () => void;
}

const StudyCard = ({ title, description, category, mentorCurrent, mentorTotal, menteeCurrent, menteeTotal, onClick }: StudyCardProps) => {
  return (
    <div
      className="w-[382px] h-[282px] bg-[#FEF0E1] rounded-[20px] shadow cursor-pointer hover:shadow-md transition font-sans"
      onClick={onClick}
    >
      <div className="px-[23px] py-[30px] flex flex-col h-full justify-between">
        <div className="mb-[10px]">
          <div className="text-groupname truncate">{title.trim() ? title : "DEFAULT TITLE"}</div>
          {category && (
            <div className="text-caption text-left text-primary font-bold leading-tight mt-[6px]">
              {category}
            </div>
          )}
        </div>
        <div className="flex items-center gap-[5px] text-label mb-[10px]">
          <span>👤</span>
          <span className="ml-2">멘토 {mentorCurrent}/{mentorTotal}</span>
          <span>·</span>
          <span>멘티 {menteeCurrent}/{menteeTotal}</span>
        </div>
        <div className="text-description line-clamp-4 overflow-hidden">
          {description}
        </div>
      </div>
    </div>
  );
};

export default StudyCard;