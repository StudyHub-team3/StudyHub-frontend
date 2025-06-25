import type { ApiResponse, TokenData } from '@/types/userApi';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import api from './axios';

// 다중 요청 시의 refresh() 다중 호출 방지 용 전역 Promise
let refreshPromise: Promise<void> | null = null;

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function tokenRefresh(access: string, refresh: string) {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
}

export function tokenClear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export function checkLogin() {
    if (validateToken()) {
        return true;
    }
    else {
        var refreshToken = getRefreshToken();

        if (refreshToken == null) {
            return false;
        }

        refreshWithLock();

        return true;
    }
}

export function getUserId() {
    try {
        var accessToken = getAccessToken();

        if (accessToken == null) {
            throw new Error("Access 토큰이 없습니다.");
        } 

        if (!validateToken()) {
            throw new Error("유효하지 않은 토큰입니다.");
        } 

        var decodedToken = jwtDecode(accessToken);

        return decodedToken.sub;

    } catch (error) {
        console.warn(error);
        refreshWithLock();
        return null;
    }
}

export function validateToken() {
    const token = getAccessToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;

    return payload.exp > now;
}

async function refresh() {
    try {
        const token = getRefreshToken();

        const response = await api.post<ApiResponse<TokenData>>("/api/users/auth/refresh", {
            token
        })
        console.log("토큰 리프레시 요청...");

        if (response.data.code === "OK") {
            console.log("토큰 리프레시 성공!");

            if (response.data.data == null) {
                throw new Error("토큰 전달 실패");
            }

            tokenRefresh(
                response.data.data?.access.token,
                response.data.data?.refresh.token
            )
        } else {
            throw new Error("토큰 생성 실패");
        }
    } catch (error) {
        console.log(error);
        window.location.href = "/login";
    }
}

export async function refreshWithLock() {
    if (!refreshPromise) {
        refreshPromise = refresh();
        await refreshPromise;
        refreshPromise = null;
    } else {
        await refreshPromise;
    }
};
