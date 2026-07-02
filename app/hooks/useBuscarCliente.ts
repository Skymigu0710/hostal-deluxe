import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Cliente } from '@/app/types/cliente';

export function useBuscarCliente(termino: string) {
  const [debounced, setDebounced] = useState(termino);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(termino), 400);
    return () => clearTimeout(timer);
  }, [termino]);

  return useQuery<Cliente[]>({
    queryKey: ['clientes', 'search', debounced],
    queryFn: async () => {
      const res = await fetch(`/api/v1/clientes/search?termino=${encodeURIComponent(debounced)}`);
      if (!res.ok) throw new Error('Error al buscar cliente');
      return res.json();
    },
    enabled: debounced.trim().length >= 3, // no busca con menos de 3 caracteres
  });
}