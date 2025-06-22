// pages/studies/StudyList.tsx
// 전체 스터디 목록 페이지

import StudyCard from "@/components/design/StudyCard"
import dummyStudyList from "@/data/dummyStudyList"

export default function StudyList() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <header className="w-full h-[70px] bg-primary flex items-center justify-between px-[24px] shadow-md font-sans">
        <div className="text-[24px] font-bold text-text-main">StudyHub</div>
        <nav className="flex gap-[20px] items-center text-[16px] text-text-main">
          <a href="/studies">스터디 목록</a>
          <a href="/mypage">마이페이지</a>
          <button className="bg-button text-white px-4 py-1 rounded">로그인</button>
        </nav>
      </header>
      <div className="pt-6 px-4">
        <div className="w-full flex flex-wrap justify-center gap-6 mt-6">
          {dummyStudyList.map((study) => (
            <StudyCard
              key={study.id}
              title={study.title}
              description={study.description}
              tags={study.tags}
              mentorCurrent={study.mentorCurrent}
              mentorTotal={study.mentorTotal}
              menteeCurrent={study.menteeCurrent}
              menteeTotal={study.menteeTotal}
              onClick={() => alert(`스터디 ID: ${study.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}