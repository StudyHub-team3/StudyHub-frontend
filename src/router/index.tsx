// src/router/index.tsx
import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import MyPage from "@/pages/mypage/MyPage"
import StudyListPage from "@/pages/studies/StudyList"
import CreateStudy from "@/pages/studies/CreateStudy"
import StudyDetail from "@/pages/studies/study/StudyDetail"
import Chat from "@/pages/studies/study/Chat"
import PostList from "@/pages/studies/study/board/PostList"
import NotFound from "@/pages/NotFound"
import EditProfile from "@/pages/mypage/EditProfile"
import EditStudy from "@/pages/studies/study/EditStudy"
import CreatePost from "@/pages/studies/study/board/CreatePost"
import PostDetail from "@/pages/studies/study/board/PostDetail"
//게시판 수정 페이지 추가
import UpdatePost from "@/pages/studies/study/board/UpdatePost";
import Notification from "@/pages/Notification"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/edit" element={<EditProfile />} />

      <Route path="/studies" element={<StudyListPage />} />
      <Route path="/studies/create" element={<CreateStudy />} />
      <Route path="/studies/:id" element={<StudyDetail />} />
      <Route path="/studies/:id/edit" element={<EditStudy />} />
      <Route path="/studies/:id/chat" element={<Chat />} />
      <Route path="/studies/:id/board" element={<PostList />} />
      <Route path="/studies/:id/board/create" element={<CreatePost />} />
      <Route path="/studies/:id/board/:postId" element={<PostDetail />} />
      //게시판 수정 페이지 추가
      <Route path="/studies/:id/board/:boardId/update" element={<UpdatePost />} />

      <Route path="/notifications" element={<Notification />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}