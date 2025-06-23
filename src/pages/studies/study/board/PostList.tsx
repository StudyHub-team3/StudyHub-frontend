// pages/studies/[id]/board/PostList.tsx
// 특정 스터디의 게시판 목록 페이지

// export default function PostList() {
//   return <div>게시판 목록 화면입니다</div>
// }

// src/pages/studies/study/board/PostList.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostList } from '@/hooks/post/usePostList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

const PostList = () => {
  const navigate = useNavigate();
  const { id: studyId } = useParams();
  const { posts, isLoading, error } = usePostList(studyId!);

  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">게시글 목록</h1>
        <Button
          onClick={() => navigate(`/studies/${studyId}/board/create`)}
          variant="default"
        >
          글작성
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => navigate(`/studies/${studyId}/board/${post.id}`)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2">
                  {post.content.slice(0, 100)}...
                </p>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PostList;