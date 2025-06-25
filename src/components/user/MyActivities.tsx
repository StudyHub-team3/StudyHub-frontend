// components/sections/MyActivitiesSection.tsx
import { StudyListType } from "@/constants/studyListType";
import api from "@/lib/axios";
import StudyList from "@/pages/studies/study/StudyList";
import { useState } from "react";

interface MyActivitiesSectionProps {
    initialActiveButton?: number; // 선택된 탭의 초기값 (옵션)
}

export default function MyActivitiesSection({ initialActiveButton = 0 }: MyActivitiesSectionProps) {
    const [activeButton, setActiveButton] = useState(initialActiveButton);

    const buttonLabels = ['참여 스터디 그룹 리스트'];

    const handleClick = (buttonIndex: number) => {
        setActiveButton(buttonIndex);
    };

    return (
        <>
            <div>
                <div className={`grid grid-cols-${buttonLabels.length} gap-x-[100px] text-center mx-[300px] my-[30px]`}>
                    {buttonLabels.map((label, index) => (
                        <p
                            key={index}
                            className={`
                            font-bold p-[10px] rounded-lg shadow-md 
                            bg-[#FFFDFD]
                            text-[#525252]
                            text-[32px]
                        `}
                            onClick={() => handleClick(index)}
                        >
                            {label}
                        </p>
                    ))}
                </div>

                <div className="min-h-[240px] p-[20px]">
                    <StudyList studyListType={StudyListType.My} />
                </div>
            </div>
        </>
    );
}