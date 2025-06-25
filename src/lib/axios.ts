// src/lib/axios.ts
import axios from 'axios';
import { getAccessToken, refreshWithLock, tokenClear, checkLogin } from "./token";
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
      if (url.indexOf('my') >= 0) return false;

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

    // 1. 토큰이 필요 없는 라우트인지 확인 (예: 로그인, 회원가입, 특정 공개 조회)
    if (isExcludedRoute(method, url)) {
      if (config.headers) {
        delete config.headers.Authorization; // Authorization 헤더를 확실히 제거
      }
      console.log(`🔓 [PUBLIC] ${url} → 토큰 없이 요청 (인터셉터 우회)`);
      return config; // ★ 중요: 토큰 검증 및 갱신 로직을 완전히 건너뛰고 바로 요청을 보냅니다.
    }

    // 2. 토큰이 필요한 라우트인 경우에만 아래 인증 로직을 수행합니다.
    try {
      // 2-1. 토큰 유효성 확인 및 갱신 시도
      if (!checkLogin()) { // Access Token이 만료되었거나 없는 경우
        throw new Error("하용되지 않은 사용자입니다.");
      }

      console.log("Access Token이 만료되었거나 존재하지 않습니다. Access Token 갱신 시도...");
      await refreshWithLock(); // Access Token 갱신 (리프레시 토큰 사용)

      // 2-2. 갱신된 토큰 (또는 기존에 유효했던 토큰)을 헤더에 추가
      if (config.headers) {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(`🔐 [AUTHORIZED] ${url} → 로그인 유저 (토큰 설정 완료)`);
        } else {
          // refreshWithLock()이 성공했는데도 토큰이 없는 비정상적인 상황 또는 최초 로그인 필요 상황
          throw new Error(`⚠️ [WARNING] ${url} → Access Token이 존재하지 않습니다. (갱신 후에도)`);
        }
      }
    } catch (authError) {
      console.error("인증 처리 중 오류 발생:", authError);

      // 토큰 갱신 실패 등 인증 관련 오류 시 사용자에게 알리고 로그인 페이지로 유도
      setTimeout(() => { // 비동기적으로 alert 및 리다이렉트 실행
        alert("로그인 세션이 종료되었거나 인증에 실패했습니다. 다시 로그인해주세요.");
        tokenClear(); // 모든 토큰 정보 삭제
        // window.location.href = '/login'; // 실제 로그인 페이지 경로로 변경
      }, 0);

      // 현재 요청을 취소하여 백엔드 호출을 막습니다.
      const errorToReject = new Error("요청 취소: 인증 처리 실패");
      errorToReject.name = "AuthenticationFailed"; // 커스텀 에러 이름
      return Promise.reject(errorToReject);
    }

    return config; // 모든 검증 및 헤더 설정 완료 후 요청 반환
  }, (error) => {
    // 요청 인터셉터 자체에서 발생한 오류 처리
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 응답 인터셉터에서 401 Unauthorized 에러 처리 (선택 사항: 요청 인터셉터에서 대부분 처리)
    if (error.response?.status === 401 && error.response?.status === 403 && error.config?.headers?.Authorization) {
        console.warn("사용자 인증 실패");
        // 여기에서 refreshWithLock()을 다시 호출하는 것은 무한 루프나 중복 갱신 시도를 야기할 수 있으므로,
        // 보통 요청 인터셉터에서 한 번의 갱신 시도를 마친 후 여기서는 사용자에게 알리고 로그인 페이지로 유도합니다.
        setTimeout(() => {
            alert("인증 정보가 유효하지 않습니다. 다시 로그인해주세요.");
            tokenClear();
            window.location.href = '/login';
        }, 0);
    } else {
      console.warn(error);
    }
    return Promise.reject(error);
  }
);

export default api