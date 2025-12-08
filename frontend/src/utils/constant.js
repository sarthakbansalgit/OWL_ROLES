const BACKEND_BASE_URL = import.meta.env.VITE_API_URL || `http://localhost:3000`

export const USER_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/company`;
export const BLOG_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/blog`;

export const CHART_API_END_POINT = `${BACKEND_BASE_URL}/api/v1/charts`;