import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import CategoryTag from "@/components/common/CategoryTag";
import StudyJoinDialog from "@/components/common/StudyJoinDialog";
import StudyJoinPendingList from "@/components/common/StudyJoinPendingList";
import api from "@/lib/axios";

// 타입 예시
interface Participant {
  id: number;
  userName: string;
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
  const [memberInfo, setMemberInfo] = useState<any>({});
  const navigate = useNavigate();

  const currentUserId = 1; // TODO: 실제 로그인된 유저 ID로 대체
  /* const isJoined = useMemo(() => {
    return study?.participants?.some(
      (p: Participant) => p.id === currentUserId
    );
  }, [study]); */

  const fetchData = async () => {
    try {
      const res = await api.get(`/api/studies/${id}`);
      const responseData = res.data as { data: StudyDetail };
      const memberList = await api.get(`/api/study-members/members/${id}`);
      const dummyParticipants: Participant[] = [
        { id: 1, userName: "Alice", role: "MENTOR" },
        { id: 2, userName: "Bob", role: "MENTEE" },
      ];
      setStudy({
        ...responseData.data,
        participants: (memberList.data as any).data,
      });
    } catch (error) {
      console.error("스터디 상세 조회 실패", error);
    }

    try {
      const info = await api.get(`/api/study-members/member/info/${id}`);

      setMemberInfo((info.data as any).data);
    } catch {
      setMemberInfo({});
    }
  };

  const leaveStudy = async () => {
    const result = await api.delete(`/api/study-members/members/${id}`);

    if (result && result.status && result.status === 200) {
      await fetchData();
    } else {
      alert("탈퇴 실패");
    }
  };

  const onClose = async () => {
    await fetchData();
  };

  useEffect(() => {
    if (!id) return;

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
          {memberInfo && memberInfo.status ? (
            memberInfo.status === "A" ? (
              <>
                <Button onClick={() => navigate(`/studies/${id}/board`)}>
                  BOARD
                </Button>
                <Button onClick={() => navigate(`/studies/${id}/chat`)}>
                  💬
                </Button>
                <Button onClick={() => navigate(`/studies/${id}/edit`)}>
                  ✏️
                </Button>
                {memberInfo && memberInfo.leader ? (
                  <StudyJoinPendingList
                    trigger={<Button>신청자</Button>}
                    studyId={Number(id)}
                    onClose={onClose}
                  />
                ) : (
                  <Button onClick={leaveStudy}>탈퇴</Button>
                )}
              </>
            ) : (
              <span className="text-[blue]">승인 대기중</span>
            )
          ) : (
            <StudyJoinDialog
              trigger={<Button>JOIN</Button>}
              studyId={Number(id)}
              onClose={onClose}
            />
          )}
        </div>
        <div className="mt-[70px] px-[150px]">
          <h2 className="text-subsubtitle mb-[24px]">🧑‍🤝‍🧑 Participants</h2>
          <div className="grid grid-cols-4 gap-[50px]">
            {study.participants?.map((p: Participant) => (
              <div
                key={p.id}
                className="bg-[#FFF1E7] p-[20px] rounded-[16px] text-center w-[300px] h-[170px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:scale-[1.05] transition-transform duration-300"
              >
                <div className="text-[14px] text-timestamp mb-[8px]">
                  {p.role === "MENTOR" ? "Mentor" : "Mentee"}
                </div>
                <div className="mt-[28px] text-groupname text-[24px] font-semibold">
                  {p.userName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
