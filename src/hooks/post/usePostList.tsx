// src/hooks/post/usePostList.ts
import { useState, useEffect } from 'react';
import type { Post, PostCreateRequest, PostUpdateRequest } from '@/types/post';
import { postAPI } from '@/api/post';

export const usePostList = (studyId: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await postAPI.getPosts();
      setPosts(data.filter(post => post.studyId === Number(studyId)));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('게시글 로딩 실패'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [studyId]);

  return { posts, isLoading, error, refetch: fetchPosts };
};
