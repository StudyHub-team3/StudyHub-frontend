"use client"

import { useForm } from "react-hook-form"
import api from "@/lib/axios"
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
import { data } from "react-router-dom"
import { Category } from "@/constants/categories"

export default function CreateStudy() {
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      mentorCount: "",
      menteeCount: "",
      description: "",
    },
  })
  const { handleSubmit } = form;

  const onSubmit = async(data:any) => {
    try{
      const response = await api.post("/api/studies", {
        groupName: data.name,
        category: data.category,
        maxMentor: Number(data.mentorCount),
        maxMentee:Number(data.menteeCount),
        description: data.description,
        endDate: "2025-07-31",
      })

      alert("스터디가 생성되었습니다!")
      console.log(response.data)
    } catch (error){
      console.error("스터디 생성 실패", error)
      alert("생성 중 오류가 발생했습니다.")
    }
  }

  return (
    <>
      <Header/>
        <div className="mt-[100px] mb-8">
          <h1 className="text-title text-center">
            Create a Study Group
          </h1>
        </div>
              <div className="w-full max-w-[1000px] mx-auto mt-[50px] mb-[50px] px-[20px]">

        <div className="p-[70px_100px] bg-[#FFF1E7] rounded-[35px] shadow-md">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
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
              <div className="flex flex-row flex-wrap gap-[20px] mb-[30px]">
                <FormField
                  control={form.control}
                  name="mentorCount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-formtitle">🧑‍🏫 멘토</FormLabel>
                      <div className="h-[20px]" />
                      <FormControl>
                        <Input type="number" {...field} className="appearance-none h-[50px] bg-white rounded-[20px] border-none text-form pl-[16px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="menteeCount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-formtitle">👶 멘티</FormLabel>
                      <div className="h-[20px]" />
                      <FormControl>
                        <Input type="number" {...field} className="appearance-none h-[50px] bg-white rounded-[20px] border-none text-form pl-[16px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <div className="flex justify-center mt-[70px] mb-[20px]">
                <Button type="submit">생성하기</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}