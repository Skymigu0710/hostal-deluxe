export interface Cliente {
  id: number;
  dni: string;
  nombreCompleto: string;
  telefono: string;
  email: string;
  esProblematico: boolean;
  motivoProblema: string | null;
  fechaRegistro: string;
}