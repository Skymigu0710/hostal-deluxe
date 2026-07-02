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
    turno: e.turnoTipo as Room['turno'],
    estado: e.estado, // ACTIVA | FINALIZADA | CANCELADA, tal cual viene
    monto: e.tarifaAplicada,
    tipoPago: 'Efectivo', // el backend aún no maneja tipoPago
    notas: 'Ninguna',      // el backend aún no maneja notas
    duracion: 0,
    tiempoActivo: '00:00',
    fecha: e.fechaHoraInicio.split('T')[0],
    montoExtra: 0,
  };
}

export function useEstadias() {
  return useQuery<Room[]>({
    queryKey: ['estadias', 'todas'],
    queryFn: async () => {
      const res = await fetch('/api/v1/estadias');
      if (!res.ok) throw new Error('Error al obtener estadías');
      const data: EstadiaResponse[] = await res.json();
      return data.map(estadiaToRoom);
    },
  });
}