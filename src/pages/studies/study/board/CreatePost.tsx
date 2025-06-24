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

export default function CreatePost() {
  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  })

  return (
    <>
      <Header/>
      <div className="mt-[100px] mb-8">
        <h1 className="text-title text-center">
          Create a Post
        </h1>
      </div>
      <div className="w-full max-w-[1000px] mx-auto mt-[50px] mb-[50px] px-[20px]">
        <div className="p-[70px_100px] bg-[#FFF1E7] rounded-[35px] shadow-md">
          <Form {...form}>
            <form className="space-y-0">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-[30px]">
                    <FormLabel className="text-formtitle">📝 제목</FormLabel>
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
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-[30px]">
                    <FormLabel className="text-formtitle">🗂️ 카테고리</FormLabel>
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
                name="content"
                render={({ field }) => (
                  <FormItem className="mb-[30px]">
                    <FormLabel className="text-formtitle">📄 내용</FormLabel>
                    <div className="h-[20px]" />
                    <FormControl>
                      <Textarea rows={5} {...field} className="rounded-[20px] h-[150px] bg-white border-none text-form pl-[16px] pt-[16px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center mt-[70px] mb-[20px]">
                <Button>작성하기</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}