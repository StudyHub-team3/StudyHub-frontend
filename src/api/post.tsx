// src/api/post.ts
import type { Post, PostCreateRequest, PostUpdateRequest } from '@/types/post';
import { dummyPosts } from '../data/dummyPosts';

export const postAPI = {
  // 게시글 목록 조회
  getPosts: async (): Promise<Post[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyPosts);
      }, 500);
    });
  },

  // 게시글 상세 조회
  getPostDetail: async (postId: number): Promise<Post | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = dummyPosts.find(post => post.id === postId);
        resolve(post || null);
      }, 500);
    });
  },

  // 게시글 작성
  createPost: async (data: PostCreateRequest): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Created post:', data);
        resolve();
      }, 500);
    });
  },

  // 게시글 수정
  updatePost: async (postId: number, data: PostUpdateRequest): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updated post:', postId, data);
        resolve();
      }, 500);
    });
  },

  // 게시글 삭제
  deletePost: async (postId: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Deleted post:', postId);
        resolve();
      }, 500);
    });
  },
};
