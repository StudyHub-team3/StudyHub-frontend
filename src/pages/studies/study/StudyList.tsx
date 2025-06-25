import StudyCard from "@/components/common/StudyCard";
import { StudyListType } from "@/constants/studyListType";
import dummyStudyList from "@/data/dummyStudyList";
import api from "@/lib/axios";
import type { ApiResponse } from "@/types/userApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

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

interface StudyListTypeProps {
    studyListType: string;
}

export default function StudyList({studyListType}: StudyListTypeProps) {
    const navigate = useNavigate();

    const [studies, setStudies] = useState<any>([])
    const [loading, setLoading] = useState(true);

    const fetchStudies = async () => {
        try {
            const response = await api.get<ApiResponse<Study[]>>("/api/studies");

            if (response.data.code === "OK") {
                setStudies(response.data.data);
                setLoading(false)
            }else {
                throw new Error("스터디 그룹 조회 실패");
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
            
            // testing 
            setStudies(dummyStudyList);
            setLoading(false);
        }
    };
    
    const fetchMyStudies = async () => {
        try {
            const response = await api.get<ApiResponse<Study[]>>("/api/studies/my");

            if (response.data.code === "OK") {
                setStudies(response.data.data);
                setLoading(false)
            }else {
                throw new Error("스터디 그룹 조회 실패");
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);

            // testing 
            setStudies(dummyStudyList);
            setLoading(false);
        }
    };

    useEffect(() => {
        switch(studyListType) {
            case StudyListType.All: 
                fetchStudies();
                break;
            case StudyListType.My: 
                fetchMyStudies();
                break;
        }
    }, []);

    return (
        <>
            {loading ? <div className="w-full flex justify-center items-center text-3xl font-semibold mt-32 ">LOADING...</div>
                :
                <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-[32px] py-[20px] px-[20px] sm:px-[40px] lg:px-[80px]">
                    {studies.map((study: Study) => {
                        const { id, groupName, description, category, maxMentee, menteeCount, maxMentor, mentorCount } = study
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
        </>
    )
}