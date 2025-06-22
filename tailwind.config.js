/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        button: "#FFA61E",         // 주황색 버튼
        "primary-light": "#FFE095", // 연한 노랑 버튼
        "gray-label": "#6b7280",
        "gray-caption": "#9ca3af",
        primary: "#FFCC80",          // 헤더 배경
        "text-main": "#525252",     // 기본 텍스트
        input: "#9E9E9E",           // 입력창 배경/텍스트
        card: "#FEF0E1",            // 스터디카드 배경
        confirm: "#82B7F5",         // 확인 버튼
        cancel: "#FF978C",          // 취소 버튼
        background: "#FAFAFA",      // 전체 배경
        border: "#D6D6D6",          // 테두리
        disabled: "#BDBDBD",        // 비활성화 텍스트/요소
        highlight: "#FFF7E0",       // 강조 배경
        "hover-primary": "#e68c0f"  // hover 상태용
      },
      fontFamily: {
        sans: ['Apple SD Gothic Neo', 'system-ui', 'sans-serif']
      },
    },
  },
  plugins: [],
}