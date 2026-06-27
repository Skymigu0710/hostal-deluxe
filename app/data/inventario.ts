import { Producto } from "@/app/types/inventario";

export const PRODUCTOS_INICIAL: Producto[] = [
  { id: "prod-1", nombre: "Pepsi",         categoria: "bebida", stock: 24, stockMinimo: 5, precioVenta: 2.00, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-2", nombre: "Inka Cola",     categoria: "bebida", stock: 18, stockMinimo: 5, precioVenta: 5.00, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-3", nombre: "Coca Cola",     categoria: "bebida", stock: 30, stockMinimo: 5, precioVenta: 5.00, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-4", nombre: "Papitas Lay's", categoria: "snack",  stock: 15, stockMinimo: 3, precioVenta: 3.50, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-5", nombre: "Doritos",       categoria: "snack",  stock: 12, stockMinimo: 3, precioVenta: 3.50, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-6", nombre: "Piqueos",       categoria: "piqueo", stock: 8,  stockMinimo: 2, precioVenta: 3.50, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
];