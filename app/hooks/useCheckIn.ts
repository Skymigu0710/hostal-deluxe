import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CrearEstadiaRequest, EstadiaResponse } from '@/app/types/estadia';

export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation<EstadiaResponse, Error, CrearEstadiaRequest>({
    mutationFn: async (data) => {
      const res = await fetch('/api/v1/estadias/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al hacer check-in');
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habitaciones'] });
      queryClient.invalidateQueries({ queryKey: ['estadias'] });
    },
  });
}