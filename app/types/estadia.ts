export type ModoUso = 'HORAS' | 'NOCHE';

export type EstadoEstadia = 'ACTIVA' | 'FINALIZADA' | 'CANCELADA';

export type TipoTurno = 'MATUTINO' | 'VESPERTINO' | 'NOCTURNO';

export interface CrearEstadiaRequest {
  clienteId: number;
  habitacionId: number;
  modoUso: ModoUso;
  horasEstimadas?: number;
  nochesEstimadas?: number;
}

export interface EstadiaResponse {
  id: number;
  fechaHoraInicio: string;
  fechaHoraFin: string | null;
  modoUso: ModoUso;
  tarifaAplicada: number;
  total: number | null;
  estado: EstadoEstadia;
  clienteId: number;
  clienteNombre: string;
  clienteDni: string;
  habitacionId: number;
  habitacionNumero: string;
  habitacionTipo: string;
  turnoId: number;
  turnoTipo: TipoTurno;
}

export interface CheckoutRequest {
  estadiaId: number;
  descuento?: number;
}