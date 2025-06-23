// src/pages/studies/study/board/UpdatePost.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostDetail } from '@/hooks/post/usePostDetail';
import { usePostMutation } from '@/hooks/post/usePostMutation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction 
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import type { PostUpdateRequest } from '@/types/post';

const UpdatePost = () => {
  const navigate = useNavigate();
  const { id: studyId, postId } = useParams();
  const { post, isLoading: isLoadingPost, error: fetchError } = usePostDetail(postId!);
  const { updatePost, isLoading: isUpdating, error: updateError } = usePostMutation();
  
  const form = useForm<PostUpdateRequest>({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
    }
  });

  React.useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
      });
    }
  }, [post, form]);

const onSubmit = async (data: PostUpdateRequest) => {
  try {
    await updatePost(Number(postId), data);
    // 수정된 부분: 게시판 목록으로 이동
    navigate(`/studies/${studyId}/board`);
  } catch (error) {
    console.error('게시글 수정 실패:', error);
  }
};


  if (fetchError) {
    return (
      <Card className="p-6 m-4">
        <div className="text-red-500">에러가 발생했습니다: {fetchError.message}</div>
      </Card>
    );
  }

  if (isLoadingPost) {
    return (
      <Card className="p-6 m-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </Card>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">게시글 수정</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                {...form.register('title', { required: true })}
                disabled={isUpdating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                {...form.register('content', { required: true })}
                className="min-h-[200px]"
                disabled={isUpdating}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? '수정 중...' : '수정하기'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/studies/${studyId}/board/${postId}`)}
                disabled={isUpdating}
              >
                취소
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {updateError && (
        <AlertDialog open={!!updateError}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>오류 발생</AlertDialogTitle>
              <AlertDialogDescription>
                {updateError.message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default UpdatePost;