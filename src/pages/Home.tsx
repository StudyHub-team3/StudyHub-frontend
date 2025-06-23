// pages/Home.tsx
// 메인 홈 화면 페이지

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import StudyCard from "@/components/common/StudyCard";
import Header from "@/components/common/Header"
import dummyStudyList from "@/data/dummyStudyList";
import { Category } from "@/constants/categories";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["전체", ...Object.values(Category)];
  const navigate = useNavigate();

  const filteredStudyList = dummyStudyList.filter((study) => {
    const matchKeyword = searchKeyword === "" || study.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchCategory = selectedCategory === "" || study.category === selectedCategory;
    return matchKeyword && matchCategory;
  });

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-[#F9F9F9] min-h-screen pt-[100px] gap-[56px] px-[80px]">
        <div className="flex flex-col items-center gap-[8px]">
          <h1 className="text-title">Find a study group!</h1>
          <Button onClick={() => navigate("/create")}>or create one</Button>
        </div>
        <div className="flex gap-[20px] pl-[20px]">
          <div className="relative w-[500px] h-[50px]">
            <input
              type="text"
              placeholder="스터디 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full h-full rounded-full border border-[#FFFFF] px-5 pr-[45px] focus:outline-none bg-white text-timestamp pl-[24px]"
            />
            <div
              role="button"
              className="absolute right-[16px] top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => {
                const queryParams = new URLSearchParams();
                if (searchKeyword) queryParams.append("groupName", searchKeyword);
                if (selectedCategory) queryParams.append("category", selectedCategory);
                navigate(`/studies?${queryParams.toString()}`);
              }}
            >
              🔍
            </div>
          </div>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className=" rounded-full px-[16px] h-[50px] text-sm bg-white flex items-center cursor-pointer text-timestamp">
                  <div className="flex items-center gap-1">
                    <span>카테고리</span>
                    <span className="text-xs"></span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[150px]">
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onSelect={() => {
                      setSelectedCategory(cat === "전체" ? "" : cat);
                    }}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-[32px] py-[20px] px-[20px] sm:px-[40px] lg:px-[80px]">
          {filteredStudyList.map((study) => (
            <div
              key={study.id}
              onClick={() => navigate(`/studies/${study.id}`)}
              className="cursor-pointer"
            >
              <StudyCard
                title={study.title}
                description={study.description}
                category={study.category}
                mentorCurrent={study.mentorCurrent}
                mentorTotal={study.mentorTotal}
                menteeCurrent={study.menteeCurrent}
                menteeTotal={study.menteeTotal}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}