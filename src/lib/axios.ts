// src/lib/axios.ts
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 여기 꼭 VITE_API_URL로 되어 있어야 함
  withCredentials: true,
})

console.log("✅ Axios Base URL:", import.meta.env.VITE_API_URL)

export default api