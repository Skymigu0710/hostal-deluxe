export type TipoHabitacion = 'PERSONAL' | 'MATRIMONIAL' | 'TEMATICA' | 'DOBLE' | 'TRIPLE';
export type EstadoHabitacion = 'DISPONIBLE' | 'LIMPIEZA' | 'OCUPADA' | 'MANTENIMIENTO' | 'RESERVADA';

export interface Habitacion {
  id: number;
  numero: string;
  tipo: TipoHabitacion;
  estado: EstadoHabitacion;
  descripcion: string | null;
  precioPorNoche: number;
  precioPorHoras: number | null;
  caracteristicas: string | null;
}