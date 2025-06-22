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
      className="bg-card p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition font-sans"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="text-groupname">{title}</div>
        {tags.length > 0 && (
          <span className="text-caption">
            {tags[0]}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-label mt-1">
        <span>👤</span>
        <span>멘토 {mentorCurrent}/{mentorTotal}</span>
        <span>·</span>
        <span>멘티 {menteeCurrent}/{menteeTotal}</span>
      </div>
      <div className="text-description mt-2 line-clamp-2">
        {description}
      </div>
    </div>
  );
};

export default StudyCard;