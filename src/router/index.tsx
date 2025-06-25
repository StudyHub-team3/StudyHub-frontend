// src/router/index.tsx
import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import MyPage from "@/pages/mypage/MyPage"
import CreateStudy from "@/pages/CreateStudy"
import StudyDetail from "@/pages/studies/study/StudyDetail"
import Chat from "@/pages/studies/study/Chat"
import PostList from "@/pages/studies/study/board/PostList"
import NotFound from "@/pages/NotFound"
import EditStudy from "@/pages/studies/study/EditStudy"
import CreatePost from "@/pages/studies/study/board/CreatePost"
import PostDetail from "@/pages/studies/study/board/PostDetail"
import Notification from "@/pages/Notification"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<MyPage />} />

      <Route path="/create" element={<CreateStudy />} />
      <Route path="/studies/:id" element={<StudyDetail />} />
      <Route path="/studies/:id/edit" element={<EditStudy />} />
      <Route path="/studies/:id/chat/:userIdString" element={<Chat />} />
      <Route path="/studies/:id/board" element={<PostList />} />
      <Route path="/studies/:id/board/create" element={<CreatePost />} />
      <Route path="/studies/:id/board/:postId" element={<PostDetail />} />

      <Route path="/notifications" element={<Notification />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}