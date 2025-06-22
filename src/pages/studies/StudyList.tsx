// pages/studies/StudyList.tsx
// 전체 스터디 목록 페이지

import StudyCard from "@/components/design/StudyCard"
import Button from "@/components/design/Button"
import dummyStudyList from "@/data/dummyStudyList"
import Header from "@/components/design/Header"

export default function StudyList() {
  return (
    <div className="min-h-screen w-full max-w-screen overflow-x-hidden flex flex-col">
  <Header />
  <div className="pt-6 px-4">
    <div className="flex justify-center mb-6">
      <Button onClick={() => alert('버튼 클릭됨')}>스터디 생성</Button>
    </div>
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