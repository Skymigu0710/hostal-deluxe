import { cookies } from 'next/headers';

export async function getAuthHeader(): Promise<Record<string, string>> {
  const token = (await cookies()).get('token')?.value;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}