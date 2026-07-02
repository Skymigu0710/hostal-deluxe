import { apiFetch } from '@/app/lib/api-client';
import { LoginRequest, LoginResponse } from '@/app/types/auth';

export async function loginRequest(credentials: LoginRequest): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}