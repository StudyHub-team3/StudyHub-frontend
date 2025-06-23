// src/hooks/post/usePostMutation.ts
import { useState } from 'react';
import { postAPI } from '@/api/post';
import type { PostCreateRequest, PostUpdateRequest } from '@/types/post';

export const usePostMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPost = async (data: PostCreateRequest) => {
    try {
      setIsLoading(true);
      await postAPI.createPost(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('게시글 작성 실패'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (postId: number, data: PostUpdateRequest) => {
    try {
      setIsLoading(true);
      await postAPI.updatePost(postId, data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('게시글 수정 실패'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId: number) => {
    try {
      setIsLoading(true);
      await postAPI.deletePost(postId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('게시글 삭제 실패'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    updatePost,
    deletePost,
    isLoading,
    error
  };
};
