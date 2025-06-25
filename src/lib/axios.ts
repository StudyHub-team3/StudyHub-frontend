// src/lib/axios.ts
import axios from 'axios';
import { validateToken, getAccessToken, refreshWithLock } from "./token";
import { EXCLUDED_ROUTES } from '@/constants/excludedUrls';
import type { AxiosRequestConfig } from 'axios'; //  TypeScript 컴파일러에게만 사용되는 구문이고, 실제 빌드 결과에는 포함되지 않으므로 런타임 오류가 발생하지 않음

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 여기 꼭 VITE_API_URL로 되어 있어야 함
  withCredentials: true,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
})

// URL이 제외 대상인지 체크
function isExcludedRoute(method?: string, url?: string) {
  return EXCLUDED_ROUTES.some((route) => {
    if (url) {
      return (
        route.method === method && url.startsWith(route.path) // 상세 조회도 포함되게
      );
    }

    return false;
  });
}

api.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    const method = config.method?.toUpperCase();
    const url = config.url ?? "";

    // 1. 토큰이 필요 없는 라우트인지 확인 (ex. login, signup)
    if (isExcludedRoute(method, url)) {
      if (config.headers) {
        delete config.headers.Authorization;
      }
      console.log(`🔓 [PUBLIC] ${url} → 토큰 없이 요청`);
      return config;
    }

    try {
      // 2. 토큰 유효성 확인
      if (!validateToken()) {
        console.log("Access Token이 만료되었습니다. Access Token Refreshing...");

        // 토큰 갱신
        await refreshWithLock(); // refresh된 access 토큰 사용하기 위함
      }

      // 3. 토큰이 유효하면 헤더에 추가 (갱신된 토큰 포함)
      if (config.headers) {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(`🔐 [AUTHORIZED] ${url} → 로그인 유저 (토큰 설정 완료)`);
        } else {
          // 토큰이 없는데 제외된 라우트가 아닌 경우 (예외 처리)
          throw new Error(`⚠️ [WARNING] ${url} → 토큰이 존재하지 않습니다.`);
        }
      }
    } catch (refreshError) {
      // refresh 실패 시 로그인 페이지로 리다이렉트 또는 에러 처리
      console.error("Access Token 갱신 실패:", refreshError);

      // 동기적인 코드가 실행될 가능성 방지 
      setTimeout(() => {
        window.location.href = "/login";
      }, 0);

      const error = new Error("요청 취소: 토큰 갱신 실패");
      error.name = "TokenRefreshFailed";
      console.warn(error);
      return Promise.reject(error);
    }

    return config;

  }, (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api