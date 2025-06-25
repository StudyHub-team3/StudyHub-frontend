export const EXCLUDED_ROUTES = [
  { method: "POST", path: "/api/users/auth/login" },
  { method: "POST", path: "/api/users/auth/register" },
  { method: "POST", path: "/api/users/auth/refresh" },
  { method: "GET", path: "/api/studies" },
  { method: "GET", path: "/api/studies/search" },
  { method: "GET", path: "/api/studies/:studyId" },
];