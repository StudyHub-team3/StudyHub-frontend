import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import CategoryTag from "@/components/common/CategoryTag";
import api from "@/lib/axios";

// 타입 예시
interface Participant {
  id: number;
  name: string;
  role: "MENTOR" | "MENTEE";
}

interface StudyDetail {
  groupName: string;
  description: string;
  category: string;
  status: string;
  mentorCount: number;
  maxMentor: number;
  menteeCount: number;
  maxMentee: number;
  createdBy: number;
  endDate: string;
  participants?: Participant[];
}

export default function StudyDetail() {
  const { id } = useParams<{ id: string }>();
  const [study, setStudy] = useState<StudyDetail | null>(null);
  const navigate = useNavigate();

  const currentUserId = 1; // TODO: 실제 로그인된 유저 ID로 대체
  const isJoined = useMemo(() => {
    return study?.participants?.some((p: Participant) => p.id === currentUserId);
  }, [study]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await api.get(`/api/studies/${id}`);
        const responseData = res.data as { data: StudyDetail };
        const dummyParticipants: Participant[] = [
          { id: 1, name: "Alice", role: "MENTOR" },
          { id: 2, name: "Bob", role: "MENTEE" }
        ];
        setStudy({ ...responseData.data, participants: dummyParticipants });
      } catch (error) {
        console.error("스터디 상세 조회 실패", error);
      }
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
          {study.groupName}
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
              <Button onClick={() => navigate(`/studies/${id}/board`)}>BOARD</Button>
              <Button onClick={() => navigate(`/studies/${id}/chat`)}>💬</Button>
              <Button onClick={() => navigate(`/studies/${id}/edit`)}>✏️</Button>
            </>
          )}
        </div>
        <div className="mt-[70px] px-[150px]">
          <h2 className="text-subsubtitle mb-[24px]">
            🧑‍🤝‍🧑 Participants 
          </h2>
          <div className="grid grid-cols-4 gap-[50px]">
            {study.participants?.map((p: Participant) => (
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