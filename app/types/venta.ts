export interface LineaVenta {
  id: string;
  productoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  id: string;
  lineas: LineaVenta[];
  total: number;
  metodoPago: "Efectivo" | "Tarjeta" | "Transferencia";
  creadoEn: string;
}