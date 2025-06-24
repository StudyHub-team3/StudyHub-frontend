"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/lib/axios";

export default function EditStudy() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { studyId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const res = await api.put(`/api/studies/${studyId}`, {
        ...values,
        endDate: "2025-08-15",
      });
      alert("수정 성공!");
      navigate(`/studies/${studyId}`);
    } catch (err) {
      alert("수정 실패");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      setIsLoading(true);
      await api.delete(`/api/studies/${studyId}`);
      alert("삭제 성공!");
      navigate("/studies");
    } catch (err) {
      alert("삭제 실패");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-[100px] mb-8">
        <h1 className="text-title text-center">
          Edit Study Group
        </h1>
      </div>
      <div className="w-full max-w-[1000px] mx-auto mt-[50px] mb-[50px] px-[20px]">
        <div className="p-[70px_100px] bg-[#FFF1E7] rounded-[35px] shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-[30px]">
                    <FormLabel className="text-formtitle">📚 스터디 그룹명</FormLabel>
                    <div className="h-[20px]" />
                    <FormControl>
                      <Input {...field} className="h-[50px] bg-white rounded-[20px] border-none text-form pl-[16px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-[30px]">
                    <FormLabel className="text-formtitle">📝 상세 설명</FormLabel>
                    <div className="h-[20px]" />
                    <FormControl>
                      <Textarea rows={5} {...field} className="rounded-[20px] h-[150px] bg-white border-none text-form pl-[16px] pt-[16px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center mt-[70px] mb-[20px] space-x-4">
                <Button type="submit" disabled={isLoading}>수정하기</Button>
                <Button type="button" onClick={onDelete} disabled={isLoading}>삭제하기</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}