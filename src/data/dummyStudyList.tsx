interface StudyData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  mentorCurrent: number;
  mentorTotal: number;
  menteeCurrent: number;
  menteeTotal: number;
}

const dummyStudyList: StudyData[] = [
  {
    id: 1,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    tags: ["프론트엔드"],
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 1,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    tags: ["프론트엔드"],
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 1,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    tags: ["프론트엔드"],
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 1,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    tags: ["프론트엔드"],
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  }

];

export default dummyStudyList;
