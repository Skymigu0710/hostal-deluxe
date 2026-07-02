import { useQuery } from '@tanstack/react-query';
import { EstadiaResponse } from '@/app/types/estadia';
import { Room } from '@/app/types/room';

function estadiaToRoom(e: EstadiaResponse): Room {
  const inicio = new Date(e.fechaHoraInicio);

  return {
    id: String(e.id),
    habitacion: e.habitacionNumero,
    clientes: e.clienteNombre,
    dni: e.clienteDni,
    horaEntrada: inicio.toTimeString().slice(0, 5),
    turno: e.turnoTipo,
    estado: 'ocupada', // toda ACTIVA se muestra como ocupada, por ahora no hay "reservada"
    monto: e.tarifaAplicada,
    tipoPago: 'Efectivo', // el backend aún no maneja tipoPago
    notas: 'Ninguna',      // el backend aún no maneja notas
    duracion: 0,           // no viene del backend todavía
    tiempoActivo: '00:00', // no viene del backend todavía
    fecha: e.fechaHoraInicio.split('T')[0],
    montoExtra: 0,
  };
}

export function useEstadiasActivas() {
  return useQuery<Room[]>({
    queryKey: ['estadias', 'activas'],
    queryFn: async () => {
      const res = await fetch('/api/v1/estadias/activas');
      if (!res.ok) throw new Error('Error al obtener estadías activas');
      const data: EstadiaResponse[] = await res.json();
      return data.map(estadiaToRoom);
    },
    refetchInterval: 30000, // refresca cada 30s para mantener las tarjetas al día
  });
}