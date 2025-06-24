// components/sections/MyActivitiesSection.tsx
import { useState } from "react";

interface MyActivitiesSectionProps {
    initialActiveButton?: number; // 선택된 탭의 초기값 (옵션)
}

export default function MyActivitiesSection({ initialActiveButton = 0 }: MyActivitiesSectionProps) {
    const [activeButton, setActiveButton] = useState(initialActiveButton);

    const buttonLabels = ['참여 목록', '신청 목록', '작성 글'];

    const handleClick = (buttonIndex: number) => {
        setActiveButton(buttonIndex);
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-x-[100px] text-center mx-[50px] my-[30px]">
                {buttonLabels.map((label, index) => (
                    <button
                        key={index}
                        className={`
                            font-bold py-3 px-6 rounded-lg shadow-md
                            ${activeButton === index
                                ? 'bg-[#FDBA74]' // 활성화된 경우
                                : 'bg-yellow-400 hover:bg-[#FFCC80]' // 비활성화된 경우
                            }
                            text-[#525252]
                        `}
                        onClick={() => handleClick(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div>
                {/* 실제 내용을 렌더링하는 부분. 나중에는 동적으로 데이터를 불러와 표시할 수 있습니다. */}
                {activeButton === 0 && <p className="text-center text-[#525252]">참여 목록이 현재 활성화되어 있습니다.</p>}
                {activeButton === 1 && <p className="text-center text-[#525252]">신청 목록이 현재 활성화되어 있습니다.</p>}
                {activeButton === 2 && <p className="text-center text-[#525252]">작성 글이 현재 활성화되어 있습니다.</p>}
            </div>
        </>
    );
}