// src/data/dummyPosts.ts
export const dummyPosts = [
  {
    id: 1,
    title: "리액트 스터디 공지사항",
    content: "이번 주 스터디는 리액트 훅에 대해 진행하겠습니다.",
    userId: "user123",
    type: "NOTICE",
    isDeleted: false,
    createdAt: "2025-06-24T10:00:00",
    updatedDatetime: null,
    studyId: 1,
    boardType: "study"
  },
  {
    id: 2,
    title: "자료 공유합니다",
    content: "유용한 리액트 강의 링크입니다.",
    userId: "user456",
    type: "GENERAL",
    isDeleted: false,
    createdAt: "2025-06-24T11:30:00",
    updatedDatetime: null,
    studyId: 1,
    boardType: "study"
  },
  {
    id: 3,
    title: "질문있습니다",
    content: "커스텀 훅 관련 질문입니다.",
    userId: "user789",
    type: "GENERAL",
    isDeleted: false,
    createdAt: "2025-06-24T14:20:00",
    updatedDatetime: null,
    studyId: 1,
    boardType: "study"
  }
];
