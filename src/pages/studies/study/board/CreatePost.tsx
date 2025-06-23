// pages/studies/[id]/board/create.tsx
// 스터디 상세 페이지 내 게시글 작성 화면

// export default function CreatePost() {
//   return <div>게시글 작성 화면입니다</div>
// }

// src/pages/studies/study/board/CreatePost.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostMutation } from '@/hooks/post/usePostMutation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';
import { AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction 
} from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 폼 검증 스키마 정의
const formSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  type: z.enum(['GENERAL', 'NOTICE']),
});

type FormData = z.infer<typeof formSchema>;

const CreatePost = () => {
  const navigate = useNavigate();
  const { id: studyId } = useParams();
  const { createPost, isLoading, error } = usePostMutation();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      type: 'GENERAL'
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const postData = {
        ...data,
        studyId: Number(studyId),
        boardType: 'study' as const,
      };
      
      console.log('Submitting post:', postData);
      await createPost(postData);
      navigate(`/studies/${studyId}/board`);
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              {...form.register('title')}
              disabled={isLoading}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              {...form.register('content')}
              className="min-h-[200px]"
              disabled={isLoading}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-500">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? '작성 중...' : '작성하기'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/studies/${studyId}/board`)}
              disabled={isLoading}
            >
              취소
            </Button>
          </div>
        </form>
      </Form>

      {error && (
        <AlertDialog open={!!error}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>오류 발생</AlertDialogTitle>
              <AlertDialogDescription>
                {error.message}
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

export default CreatePost;
