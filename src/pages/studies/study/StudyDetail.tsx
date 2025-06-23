import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import CategoryTag from "@/components/common/CategoryTag";

// 타입 예시
interface Participant {
  id: number;
  name: string;
  role: "MENTOR" | "MENTEE";
}

interface StudyDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  participants: Participant[];
  maxParticipant: number;
}

export default function StudyDetail() {
  const { id } = useParams<{ id: string }>();
  const [study, setStudy] = useState<StudyDetail | null>(null);
  const navigate = useNavigate();

  const currentUserId = 1; // TODO: 실제 로그인된 유저 ID로 대체
  const isJoined = useMemo(() => {
    return study?.participants.some((p) => p.id === currentUserId);
  }, [study]);

  useEffect(() => {
    if (!id) return;

    // TODO: 실제 API 호출로 교체
    const fetchData = async () => {
      const mockData: StudyDetail = {
        id: Number(id ?? 0),
        title: "Study Group 1",
        description: "스터디 그룹 구합니다 소규모로 진행하고싶고\n멘토를 구해봅니다",
        category: "Spring Boot",
        participants: [
          { id: 1, name: "홍길동", role: "MENTOR" },
          { id: 2, name: "김철수", role: "MENTEE" },
          { id: 3, name: "이영희", role: "MENTEE" },
          { id: 4, name: "홍길동", role: "MENTOR" },
          { id: 5, name: "김철수", role: "MENTEE" },
          { id: 6, name: "이영희", role: "MENTEE" }
        ],
        maxParticipant: 4,
      };
      setStudy(mockData);
    };

    fetchData();
  }, [id]);

  if (!study) return null;

  return (
    <>
      <Header />
      <div className="mt-[100px] mb-[50px] flex flex-col items-center px-[20px]">
        <div className="mb-[12px]">
          <CategoryTag label={study.category} />
        </div>
        <h1 className="text-title mb-[37px] max-w-[600px] break-words text-center">
          {study.title}
        </h1>
        <p className="text-subtitle text-center leading-6 mb-[30px] max-w-[700px] break-words">
          {study.description.split("\n").map((line, index) => (
            <span key={`desc-line-${index}`}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="flex gap-[30px] mt-[30px] mb-[30px]">
          {!isJoined ? (
            <Button>JOIN</Button>
          ) : (
            <>
              <Button onClick={() => navigate(`/studies/${study.id}/board`)}> BOARD </Button>
              <Button onClick={() => navigate(`/studies/${study.id}/chat`)}>👨🏻‍💻💬</Button>
            </>
          )}
        </div>
        <div className="mt-[70px] px-[150px]">
          <h2 className="text-subsubtitle mb-[24px]">
            🧑‍🤝‍🧑 Participants 
          </h2>
          <div className="grid grid-cols-4 gap-[50px]">
            {study.participants.map((p) => (
              <div key={p.id} className="bg-[#FFF1E7] p-[20px] rounded-[16px] text-center w-[300px] h-[170px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:scale-[1.05] transition-transform duration-300">
                <div className="text-[14px] text-timestamp mb-[8px]">
                  {p.role === "MENTOR" ? "Mentor" : "Mentee"}
                </div>
                <div className="mt-[28px] text-groupname text-[24px] font-semibold">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}