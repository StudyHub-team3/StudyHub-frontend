// src/types/post.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  type: 'GENERAL' | 'NOTICE';
  boardType: 'study';
  userId: number;
  studyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostCreateRequest {
  title: string;
  content: string;
  type: 'GENERAL' | 'NOTICE';
  boardType: 'study';
  studyId: number;
}

export interface PostUpdateRequest {
  title: string;
  content: string;
}

export interface PostListResponse {
  posts: Post[];
  totalPages: number;
  totalElements: number;
  size: number;
  page: number;
}