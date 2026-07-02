import { useQuery } from '@tanstack/react-query';
import { Habitacion } from '@/app/types/habitacion';

export function useHabitaciones() {
  return useQuery<Habitacion[]>({
    queryKey: ['habitaciones'],
    queryFn: async () => {
      const res = await fetch('/api/v1/habitaciones');
      if (!res.ok) throw new Error('Error al obtener habitaciones');
      return res.json();
    },
  });
}