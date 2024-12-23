// loginService.ts
import apiClient from "@/util/axios";

export async function loginWithProvider(provider: string, code: string) {
  // 로그인 API 호출 로직
  const response = await apiClient.post(`/api/login/${provider}`, { code });
  return response.data;
}
