// pages/studies/[id]/board/[postId].tsx
// 스터디 게시판에서 특정 게시글의 상세 내용을 보여주는 페이지

// export default function PostDetail() {
//   return <div>게시글 상세 화면입니다</div>
// }

// src/pages/studies/study/board/PostDetail.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostDetail } from '@/hooks/post/usePostDetail';
import { usePostMutation } from '@/hooks/post/usePostMutation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const PostDetail = () => {
  const navigate = useNavigate();
  const { id: studyId, postId } = useParams();
  const { post, isLoading, error } = usePostDetail(postId!);
  const { deletePost, isLoading: isDeleting } = usePostMutation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(Number(postId));
      navigate(`/studies/${studyId}/board`);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  if (error) {
    return (
      <Card className="p-6 m-4">
        <div className="text-red-500">에러가 발생했습니다: {error.message}</div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 m-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-32 w-full" />
      </Card>
    );
  }

  if (!post) {
    return (
      <Card className="p-6 m-4">
        <div>게시글을 찾을 수 없습니다.</div>
      </Card>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <Badge variant="outline">
              {post.type === 'NOTICE' ? '공지사항' : '일반글'}
            </Badge>
          </div>
          <div className="flex gap-2 text-muted-foreground text-sm">
            <span>작성자: {post.userId}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="border-t border-b py-6 my-4">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => navigate(`/studies/${studyId}/board`)}
            disabled={isDeleting}
          >
            목록으로
          </Button>
          <Button
            onClick={() => navigate(`/studies/${studyId}/board/${postId}/update`)}
            disabled={isDeleting}
          >
            수정
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
          >
            삭제
          </Button>
        </div>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostDetail;