export interface Producto {
  id: string;
  nombre: string;
  categoria: "bebida" | "snack" | "piqueo";
  stock: number;
  stockMinimo: number;
  precioVenta: number;
  activo: boolean;
  creadoEn: string;
  actualizadoEn: string;
}