import { apiFetch } from '@/app/lib/api-client';
import { getAuthHeader } from '@/app/lib/auth';
import { Cliente } from '@/app/types/cliente';

export async function buscarClientes(termino: string): Promise<Cliente[]> {
  const authHeader = await getAuthHeader();
  return apiFetch<Cliente[]>(`/api/v1/clientes/search?termino=${encodeURIComponent(termino)}`, {
    headers: { ...authHeader },
  });
}