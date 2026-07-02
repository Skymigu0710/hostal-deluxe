import { apiFetch } from '@/app/lib/api-client';
import { getAuthHeader } from '@/app/lib/auth';
import { Habitacion } from '@/app/types/habitacion';

export async function listarHabitaciones(): Promise<Habitacion[]> {
  const authHeader = await getAuthHeader();
  return apiFetch<Habitacion[]>('/api/v1/habitaciones', {
    headers: { ...authHeader },
  });
}