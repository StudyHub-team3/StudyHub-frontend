// src/hooks/post/usePostDetail.ts
import { useState, useEffect } from 'react';
import type { Post, PostCreateRequest, PostUpdateRequest } from '@/types/post';
import { postAPI } from '@/api/post';

export const usePostDetail = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const data = await postAPI.getPostDetail(Number(postId));
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('게시글 로딩 실패'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return { post, isLoading, error, refetch: fetchPost };
};
