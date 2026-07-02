import { apiFetch } from '@/app/lib/api-client';
import { getAuthHeader } from '@/app/lib/auth';
import { CheckoutRequest, CrearEstadiaRequest, EstadiaResponse } from '@/app/types/estadia';

export async function realizarCheckIn(data: CrearEstadiaRequest): Promise<EstadiaResponse> {
  const authHeader = await getAuthHeader();
  return apiFetch<EstadiaResponse>('/api/v1/estadias/checkin', {
    method: 'POST',
    headers: { ...authHeader },
    body: JSON.stringify(data),
  });
}

export async function listarEstadiasActivas(): Promise<EstadiaResponse[]> {
  const authHeader = await getAuthHeader();
  return apiFetch<EstadiaResponse[]>('/api/v1/estadias/activas', {
    headers: { ...authHeader },
  });
}

export async function listarTodasEstadias(): Promise<EstadiaResponse[]> {
  const authHeader = await getAuthHeader();
  return apiFetch<EstadiaResponse[]>('/api/v1/estadias', {
    headers: { ...authHeader },
  });}

export async function realizarCheckout(data: CheckoutRequest): Promise<EstadiaResponse> {
  const authHeader = await getAuthHeader();
  return apiFetch<EstadiaResponse>('/api/v1/estadias/checkout', {
    method: 'PUT',
    headers: { ...authHeader },
    body: JSON.stringify(data),
  });
}

