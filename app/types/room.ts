export interface Room {
  id: string;
  habitacion: string;
  clientes: string;
  dni: string;
  horaEntrada: string;
  turno: string;
  estado: string;
  monto: number;
  tipoPago: "Efectivo" | "Tarjeta" | "Transferencia";
  notas: string;
  duracion: number;
  tiempoActivo: string;
  fecha: string;
  montoExtra: number;
}