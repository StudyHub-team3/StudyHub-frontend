// pages/Home.tsx
// 메인 홈 화면 페이지

import { useEffect, useState } from "react";
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


type Study = {
  id: number
  groupName: string
  description: string
  category: string
  mentorCount: number
  maxMentor: number
  menteeCount: number
  maxMentee: number
}

export default function Home() {
  const [studies, setStudies] = useState<any>([])

  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["전체", ...Object.values(Category)];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/studies");
        
        const { data } = await response.json();
        setStudies(data);
        setLoading(false)
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };
    console.log("start fetching..");
    
    fetchStudies(); // ✅ useEffect 내부에서 async 함수를 따로 선언하고 호출
  }, []);


  

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
        {loading ? <div className="w-full flex justify-center items-center text-3xl font-semibold mt-32 ">LOADING...</div> 
        : 
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-[32px] py-[20px] px-[20px] sm:px-[40px] lg:px-[80px]">
          {studies.map((study: Study) => {
            const {id, groupName, description, category, maxMentee, menteeCount, maxMentor, mentorCount} = study
            return (
      
            <div
              key={id}
              onClick={() => navigate(`/studies/${id}`)}
              className="cursor-pointer"
            >
              <StudyCard
                title={groupName}
                description={description}
                category={category}
                mentorCurrent={mentorCount}
                mentorTotal={maxMentor}
                menteeCurrent={menteeCount}
                menteeTotal={maxMentee}
              />
            </div>
          )
          })}
        </div>
        }
  
      </div>
    </>
  );
}