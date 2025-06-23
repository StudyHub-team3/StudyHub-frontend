import { Category } from "../constants/categories";

interface StudyData {
  id: number;
  title: string;
  description: string;
  category: Category;
  mentorCurrent: number;
  mentorTotal: number;
  menteeCurrent: number;
  menteeTotal: number;
}

const dummyStudyList: StudyData[] = [
  {
    id: 1,
    title: "React 입문 React 입문 스터디React 입문 스터디React 입문 스터디스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 2,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 3,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 10,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 4,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 5,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 6,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 7,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 8,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  },
  {
    id: 9,
    title: "React 입문 스터디",
    description: "초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕초보자를 위한 React 기초 개념 정리 및 실습 중심 스터디입니다.안녕",
    category: Category.SpringBoot,
    mentorCurrent: 0,
    mentorTotal: 1,
    menteeCurrent: 3,
    menteeTotal: 5,
  }

];

export default dummyStudyList;
